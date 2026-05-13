import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "lib/auth";
import { ProductCreatePageView } from "pages-sections/vendor-dashboard/products/page-view";

export const metadata: Metadata = {
  title: "Product Create - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function ProductCreate() {
  const session = await auth();
  if (session?.user?.role === "ADMIN") {
    redirect("/admin/products");
  }

  return <ProductCreatePageView />;
}
