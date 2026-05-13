"use client";

import { memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// CUSTOM GLOBAL COMPONENTS
import IconComponent from "components/IconComponent";
// CATEGORY TYPESCRIPT INTERFACE
import Category from "models/Category.model";
// STYLED COMPONENTS
import { SaleNavItem } from "./styles";

// ==========================================================================
type Props = { categories: Category[]; path: string };
// ==========================================================================

export default memo(function SalesNavbar({ categories, path }: Props) {
  const params = useParams<{ slug: string }>();

  return (
    <Box bgcolor="grey.50">
      <Container>
        <Box height="5rem" display="flex" justifyContent="center">
          {categories.map((item) => (
            <Link href={`${path}/${item.slug}`} key={item.id} scroll={false}>
              <SaleNavItem selected={item.slug === params.slug}>
                <IconComponent icon={item.icon!} className="icon" />
                <p>{item.name}</p>
              </SaleNavItem>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
});
