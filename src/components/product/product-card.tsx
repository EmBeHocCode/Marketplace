import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group flex h-full flex-col gap-4 p-5">
      <div className="rounded-[24px] bg-gradient-to-br from-rose-100 via-white to-blue-100 p-5">
        <div className="flex items-center justify-between">
          <Badge label={product.type} />
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
            <FontAwesomeIcon icon={faStar} className="h-4 w-4" />
            {product.rating}
          </div>
        </div>
        <div className="mt-10 min-h-[72px]">
          <p className="text-2xl font-bold text-ink">{product.name}</p>
          <p className="mt-2 text-sm text-muted">{product.shortDescription}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Từ</p>
            <p className="text-2xl font-bold text-ink">{formatCurrency(product.price)}</p>
          </div>
          <Button href={`/products/${product.slug}`} variant="outline">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </Card>
  );
}
