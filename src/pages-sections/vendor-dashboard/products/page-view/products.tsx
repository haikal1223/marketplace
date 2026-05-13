"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import OverlayScrollbar from "components/overlay-scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
//  LOCAL CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "name", label: "Name", align: "left" },
  { id: "category", label: "Category", align: "left" },
  { id: "brand", label: "Brand", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "published", label: "Published", align: "left" },
  { id: "action", label: "Action", align: "center" }
];

// =============================================================================
type Props = { products: Product[]; createUrl?: string; editBasePath?: string };
// =============================================================================

export default function ProductsPageView({
  products,
  /** Admin: tidak mengisi — tombol tambah disembunyikan */
  createUrl,
  editBasePath = "/admin/products"
}: Props) {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const reshapedProducts = products.map((item) => {
    const rel = (item as any).brand;
    const brandImage =
      rel && typeof rel === "object" && rel.image
        ? String(rel.image)
        : typeof item.brand === "string"
          ? item.brand
          : "";
    const brandName = rel && typeof rel === "object" && rel.name ? String(rel.name) : "";

    return {
      id: item.id,
      slug: item.slug,
      name: item.title,
      brand: brandImage,
      brandName,
      price: item.price,
      image: item.thumbnail,
      published: item.published ?? true,
      category: Array.isArray(item.categories)
        ? (item.categories[0] as any)?.category?.name ?? item.categories[0] ?? ""
        : ""
    };
  });

  const { order, orderBy, rowsPerPage, filteredList, handleChangePage, handleRequestSort } =
    useMuiTable({ listData: reshapedProducts });

  return (
    <PageWrapper title="Product List">
      <SearchArea buttonText="Add Product" url={createUrl} searchPlaceholder="Search Product..." />

      <Card>
        <OverlayScrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                orderBy={orderBy}
                heading={tableHeading}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((product, index) => (
                  <ProductRow key={index} product={product} editBasePath={editBasePath} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </OverlayScrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
