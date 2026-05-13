"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import Container from "components/Container";
import ProductCard10 from "components/product-cards/product-card-10";
import ProductsCarousel from "./products-carousel";
// STYLED COMPONENTS
import { SectionHeader } from "./styles";
// UTIL METHOD
import axios from "utils/axiosInstance";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// FILTERABLE BUTTON LIST
const FILTER_BUTTONS = [
  { id: 1, title: "New Arrivals", value: "new" },
  { id: 2, title: "Best Seller", value: "best" },
  { id: 3, title: "Most Popular", value: "popular" },
  { id: 4, title: "View All", value: "view" }
];

export default function Section9() {
  const [selected, setSelected] = useState("new");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/market-3/products", { params: { type: selected } })
      .then(({ data }) => setProducts(data));
  }, [selected]);

  const handleSelected = useCallback((item: string) => {
    setSelected(item);
  }, []);

  return (
    <Container>
      <SectionHeader>
        <div>
          <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
            Selected Products
          </Typography>

          <Typography variant="body1" color="text.secondary">
            All our new arrivals in a exclusive brand selection
          </Typography>
        </div>

        <div className="button-group">
          {FILTER_BUTTONS.map(({ id, title, value }) => (
            <Button
              key={id}
              color="primary"
              onClick={() => handleSelected(value)}
              variant={value === selected ? "contained" : "outlined"}>
              {title}
            </Button>
          ))}
        </div>
      </SectionHeader>

      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard10 product={product} key={product.id} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}
