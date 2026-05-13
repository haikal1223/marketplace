import ProductsPageView from "./products";
import Product from "models/Product.model";

type Props = { products: Product[] };

export default function VendorProductsPageView({ products }: Props) {
  return (
    <ProductsPageView
      products={products}
      createUrl="/vendor/products/create"
      editBasePath="/vendor/products"
    />
  );
}
