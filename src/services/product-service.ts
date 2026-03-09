import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runSafeDbQuery } from "@/services/db-utils";
import {
  mapPrismaCategory,
  mapPrismaProduct,
  mapPrismaReview
} from "@/services/sql-mappers";
import type { PaginatedResult, Product, ProductFilters } from "@/types/domain";

export async function getCategories() {
  return runSafeDbQuery([], async () => {
    const categories = await prisma.category.findMany({
      where: { parentId: null, isVisible: true },
      include: {
        children: {
          where: { isVisible: true },
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
        }
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    return categories.map(mapPrismaCategory);
  });
}

function buildProductWhere(filters: ProductFilters): Prisma.ProductWhereInput {
  const { q, category, type, promotion, priceMin, priceMax, tag } = filters;

  const where: Prisma.ProductWhereInput = {
    isPublished: true
  };
  const andConditions: Prisma.ProductWhereInput[] = [];

  if (q) {
    const normalizedType = q.trim().toUpperCase();
    const typeFilter = ["VPS", "CLOUD", "GIFTCARD", "GAMECARD", "DIGITAL"].includes(normalizedType)
      ? (normalizedType as Product["type"])
      : null;

    andConditions.push({
      OR: [
      { name: { contains: q, mode: "insensitive" } },
      { shortDescription: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { category: { name: { contains: q, mode: "insensitive" } } }
      ]
    });

    if (typeFilter) {
      andConditions[andConditions.length - 1].OR?.push({ type: typeFilter });
    }
  }

  if (category) {
    andConditions.push({
      OR: [{ categoryId: category }, { category: { parentId: category } }]
    });
  }

  if (type) {
    where.type = type;
  }

  if (promotion) {
    where.isPromotion = true;
  }

  if (typeof priceMin === "number" || typeof priceMax === "number") {
    where.price = {};
    if (typeof priceMin === "number") {
      where.price.gte = priceMin;
    }
    if (typeof priceMax === "number") {
      where.price.lte = priceMax;
    }
  }

  if (tag) {
    andConditions.push({
      tags: {
        has: tag
      }
    });
  }

  if (andConditions.length) {
    where.AND = andConditions;
  }

  return where;
}

function buildProductOrderBy(
  sort: ProductFilters["sort"]
): Prisma.ProductOrderByWithRelationInput[] {
  switch (sort) {
    case "price-asc":
      return [{ price: "asc" }];
    case "price-desc":
      return [{ price: "desc" }];
    case "rating":
      return [{ rating: "desc" }, { reviewsCount: "desc" }];
    case "popularity":
      return [{ reviewsCount: "desc" }, { rating: "desc" }, { isHot: "desc" }];
    case "newest":
      return [{ createdAt: "desc" }];
    case "featured":
    default:
      return [{ isFeatured: "desc" }, { isHot: "desc" }, { createdAt: "desc" }];
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedResult<Product>> {
  const { sort = "featured", page = 1, pageSize = 8 } = filters;

  return runSafeDbQuery(
    {
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      pageSize
    },
    async () => {
      const where = buildProductWhere(filters);
      const [totalItems, records] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          include: {
            images: {
              orderBy: { sortOrder: "asc" }
            }
          },
          orderBy: buildProductOrderBy(sort),
          skip: (page - 1) * pageSize,
          take: pageSize
        })
      ]);

      return {
        items: records.map(mapPrismaProduct),
        totalItems,
        totalPages: totalItems ? Math.ceil(totalItems / pageSize) : 0,
        currentPage: page,
        pageSize
      };
    }
  );
}

export async function getProductBySlug(slug: string) {
  return runSafeDbQuery<Product | undefined>(undefined, async () => {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      }
    });

    return product ? mapPrismaProduct(product) : undefined;
  });
}

export async function getFeaturedProducts() {
  return runSafeDbQuery<Product[]>([], async () => {
    const records = await prisma.product.findMany({
      where: {
        isPublished: true,
        isFeatured: true
      },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: [{ isHot: "desc" }, { createdAt: "desc" }],
      take: 6
    });

    return records.map(mapPrismaProduct);
  });
}

export async function getHotProducts() {
  return runSafeDbQuery<Product[]>([], async () => {
    const records = await prisma.product.findMany({
      where: {
        isPublished: true,
        isHot: true
      },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: [{ reviewsCount: "desc" }, { rating: "desc" }],
      take: 6
    });

    return records.map(mapPrismaProduct);
  });
}

export async function getPromotionProducts() {
  return runSafeDbQuery<Product[]>([], async () => {
    const records = await prisma.product.findMany({
      where: {
        isPublished: true,
        isPromotion: true
      },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 4
    });

    return records.map(mapPrismaProduct);
  });
}

export async function getRelatedProducts(productId: string) {
  return runSafeDbQuery<Product[]>([], async () => {
    const current = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        type: true,
        categoryId: true,
        category: {
          select: {
            parentId: true
          }
        }
      }
    });

    if (!current) {
      return [];
    }

    const categoryIds = [current.categoryId, current.category.parentId].filter(Boolean) as string[];

    const records = await prisma.product.findMany({
      where: {
        id: { not: current.id },
        isPublished: true,
        OR: [{ type: current.type }, { categoryId: { in: categoryIds } }]
      },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: [{ isHot: "desc" }, { rating: "desc" }],
      take: 4
    });

    return records.map(mapPrismaProduct);
  });
}

export async function getProductReviews(productId: string) {
  return runSafeDbQuery([], async () => {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true
          }
        }
      },
      orderBy: [{ verifiedPurchase: "desc" }, { createdAt: "desc" }]
    });

    return reviews.map(mapPrismaReview);
  });
}
