"use client";

import { useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import SaleNavbar from "../sales-navbar";
import ProductList from "../product-list";
import CategoryList from "../category-list";
import ProductPagination from "../product-pagination";
// GLOBAL CUSTOM HOOK
import useScroller from "hooks/useScroller";
// STYLED COMPONENT
import { CategoryWrapper } from "../styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import Category from "models/Category.model";

// ==============================================================
interface Props {
  page: number;
  offer: string;
  discount: string;
  pageSize: number;
  products: Product[];
  totalProducts: number;
  categories: Category[];
}
// ==============================================================

export default function SalesOnePageView({
  offer,
  discount,
  page,
  products,
  pageSize,
  categories,
  totalProducts
}: Props) {
  const categoryRef = useRef<HTMLDivElement>(null);
  const { isFixedHeader } = useScroller(categoryRef);

  return (
    <Container className="mt-2">
      <CategoryWrapper show={isFixedHeader}>
        <SaleNavbar path="/sales-1" categories={categories} />
      </CategoryWrapper>

      <Typography
        variant="h1"
        color="primary"
        fontWeight={700}
        sx={{
          mb: 4,
          span: {
            ml: 1,
            color: "text.secondary"
          }
        }}>
        {offer} <span>{discount}</span>
      </Typography>

      <CategoryList ref={categoryRef} categories={categories} />

      <ProductList products={products} />

      <ProductPagination page={page} perPage={pageSize} totalProducts={totalProducts} />
    </Container>
  );
}
