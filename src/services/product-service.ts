import { categories, products, reviews } from "@/mock";
import type { PaginatedResult, Product, ProductFilters } from "@/types/domain";
import { paginate } from "@/utils/pagination";

function getCategoryName(productCategoryId: string) {
  const direct = categories.find((category) => category.id === productCategoryId);
  if (direct) {
    return direct.name;
  }

  const parent = categories.find((category) =>
    category.children?.some((child) => child.id === productCategoryId)
  );
  return parent?.name ?? "";
}

export function getCategories() {
  return categories;
}

export function getProducts(filters: ProductFilters = {}): PaginatedResult<Product> {
  const {
    q,
    category,
    type,
    promotion,
    sort = "featured",
    page = 1,
    pageSize = 8
  } = filters;

  let filtered = [...products];

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        getCategoryName(product.categoryId).toLowerCase().includes(query)
    );
  }

  if (category) {
    filtered = filtered.filter((product) => product.categoryId === category);
  }

  if (type) {
    filtered = filtered.filter((product) => product.type === type);
  }

  if (promotion) {
    filtered = filtered.filter((product) => product.isPromotion);
  }

  filtered.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return Number(b.isFeatured) - Number(a.isFeatured) || Number(b.isHot) - Number(a.isHot);
    }
  });

  return paginate(filtered, page, pageSize);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured).slice(0, 6);
}

export function getHotProducts() {
  return products.filter((product) => product.isHot).slice(0, 6);
}

export function getPromotionProducts() {
  return products.filter((product) => product.isPromotion).slice(0, 4);
}

export function getRelatedProducts(productId: string) {
  const current = products.find((product) => product.id === productId);
  if (!current) {
    return [];
  }

  return products
    .filter(
      (product) =>
        product.id !== productId &&
        (product.type === current.type || product.categoryId === current.categoryId)
    )
    .slice(0, 4);
}

export function getProductReviews(productId: string) {
  return reviews.filter((review) => review.productId === productId);
}
