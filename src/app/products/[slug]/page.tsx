import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "lib/auth";
import { prisma } from "lib/prisma";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
// API FUNCTIONS
import api from "utils/__api__/products";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await api.getProduct(slug);
  if (!product) notFound();

  return {
    title: product.title + " - Bazaar Next.js E-commerce Template",
    description: "Bazaar is a React Next.js E-commerce template.",
    authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
  };
}

export default async function ProductDetails({ params }: SlugParams) {
  const { slug } = await params;
  const [product, relatedProducts, frequentlyBought] = await Promise.all([
    api.getProduct(slug),
    getRelatedProducts(slug),
    getFrequentlyBought(slug)
  ]);

  if (!product) notFound();

  const session = await auth();
  let inWishlist = false;
  if (session?.user?.id) {
    const row = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: { userId: session.user.id, productId: product.id }
      },
      select: { id: true }
    });
    inWishlist = !!row;
  }

  return (
    <ProductDetailsPageView
      product={product}
      inWishlist={inWishlist}
      relatedProducts={relatedProducts}
      frequentlyBought={frequentlyBought}
    />
  );
}
