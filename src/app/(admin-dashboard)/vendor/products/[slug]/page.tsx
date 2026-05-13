import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerAxios } from "utils/serverAxios";
import { EditProductPageView } from "pages-sections/vendor-dashboard/products/page-view";

export const metadata: Metadata = {
  title: "Edit Product - Vendor Dashboard",
  description: "Edit your product"
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VendorProductEdit({ params }: Props) {
  const { slug } = await params;

  const api = await getServerAxios();
  const res = await api.get(`/api/vendor/products/${slug}`).catch(() => null);

  if (!res || !res.data) notFound();

  const product = res.data;
  const initialData = {
    slug: product.slug,
    name: product.title,
    description: product.description ?? "",
    price: String(product.price),
    sale_price: product.discount ? String(Math.round(product.price * (1 - product.discount / 100))) : "",
    stock: String(product.stock),
    tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
    category: product.categories?.map((pc: any) => pc.category?.name ?? pc) ?? [],
    thumbnail: product.thumbnail ?? "",
    warehouseId: product.warehouseId ?? "",
    brandId: product.brandId ?? product.brand?.id ?? ""
  };

  return <EditProductPageView initialData={initialData} />;
}
