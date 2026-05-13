import { Metadata } from "next";
import { notFound } from "next/navigation";
import FurnitureOnePageView from "pages-sections/furniture-1/page-view";
// API FUNCTIONS
import api from "utils/__api__/furniture-1";

export const metadata: Metadata = {
  title: "Furniture Shop - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// ==============================================================
interface Props {
  params: Promise<{ category: string }>;
}
// ==============================================================

export default async function FurnitureShopWithCategory({ params }: Props) {
  const { category: cat } = await params;

  const category = await api.getCategory(cat);
  if (!category) notFound();

  return <FurnitureOnePageView selected={category.title} />;
}
