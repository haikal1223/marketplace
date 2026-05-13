// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";

interface Props {
  initialData?: Parameters<typeof ProductForm>[0]["initialData"];
}

export default function EditProductPageView({ initialData }: Props) {
  return (
    <PageWrapper title="Edit Product">
      <ProductForm initialData={initialData} />
    </PageWrapper>
  );
}
