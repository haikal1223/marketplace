import Image from "next/image";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import Container from "components/Container";
import BrandsCarousel from "./brands-carousel";
// STYLED COMPONENT
import { StyledContent } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-3";

export default async function Section8() {
  const brands = await api.getBrands();
  if (!brands || !brands) return null;

  return (
    <Container>
      <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
        Selected Products
      </Typography>

      <StyledContent>
        <BrandsCarousel>
          {brands.map(({ id, image }) => (
            <div className="brand-item" key={id}>
              <Image fill src={image} alt="brand" sizes="(110px, 50px)" />
            </div>
          ))}
        </BrandsCarousel>
      </StyledContent>
    </Container>
  );
}
