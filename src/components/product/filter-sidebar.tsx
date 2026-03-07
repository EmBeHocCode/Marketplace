import Link from "next/link";
import { categories } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ProductType } from "@/types/domain";

const types: ProductType[] = ["VPS", "CLOUD", "GIFTCARD", "GAMECARD"];

export function FilterSidebar() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">Loại sản phẩm</p>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Link key={type} href={`/products?type=${type}`}>
              <Badge label={type} />
            </Link>
          ))}
        </div>
      </Card>
      <Card>
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">Danh mục</p>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id}>
              <Link href={`/products?category=${category.id}`} className="font-semibold text-ink">
                {category.name}
              </Link>
              <div className="mt-2 space-y-2 pl-3 text-sm text-muted">
                {category.children?.map((child) => (
                  <Link key={child.id} href={`/products?category=${child.id}`} className="block">
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
