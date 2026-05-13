import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import ProductList from "../product-list";
import ProductPagination from "../product-pagination";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
interface Props {
  page: number;
  pageSize: number;
  products: Product[];
  totalProducts: number;
}
// ==============================================================

export default function SalesTwoPageView({ products, page }: Props) {
  return (
    <Container className="mt-2">
      <ProductList products={products} />
      <ProductPagination page={page} perPage={20} totalProducts={100} />
    </Container>
  );
}
