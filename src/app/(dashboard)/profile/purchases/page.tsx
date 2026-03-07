import { products } from "@/mock";
import { ProductCard } from "@/components/product/product-card";

export default function ProfilePurchasesRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-ink">Sản phẩm đã mua</h1>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
