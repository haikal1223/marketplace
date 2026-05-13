import { Metadata } from "next";
import { SalesTwoPageView } from "pages-sections/sales/page-view";
// SALES API FUNCTIONS
import api from "utils/__api__/sales";

export const metadata: Metadata = {
  title: "Sales 2 - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// ==============================================================
interface Props {
  searchParams: Promise<{ page: string }>;
}
// ==============================================================

export default async function SalesTwo({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = +page || 1;
  const data = await api.getProducts(currentPage);

  if (!data) {
    return <div>Failed to load</div>;
  }

  if (!data.products) {
    return <div>No products found</div>;
  }

  return (
    <SalesTwoPageView
      page={currentPage}
      products={data.products}
      pageSize={data.pageSize}
      totalProducts={data.totalProducts}
    />
  );
}
