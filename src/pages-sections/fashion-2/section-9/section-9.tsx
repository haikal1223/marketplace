import Image from "next/image";
// MUI
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";
import BrandsCarousel from "./brands-carousel";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section9() {
  const brands = await api.getBrands();
  if (!brands || !brands.length) return null;

  return (
    <Container className="mt-4">
      <Divider sx={{ mb: 4, borderColor: "grey.200" }} />

      <BrandsCarousel>
        {brands.map(({ id, image }) => (
          <FlexRowCenter position="relative" key={id} height={40} margin="auto" width={110}>
            <Image
              fill
              alt="brand"
              src={image}
              sizes="(110px, 50px)"
              style={{ filter: "grayscale(1)", objectFit: "contain" }}
            />
          </FlexRowCenter>
        ))}
      </BrandsCarousel>

      <Divider sx={{ mt: 4, borderColor: "grey.200" }} />
    </Container>
  );
}
