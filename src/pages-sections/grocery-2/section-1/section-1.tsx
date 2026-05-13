import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import HeroCarousel from "./hero-carousel";
import LazyImage from "components/LazyImage";
import { FooterApps } from "components/footer";
// CUSTOM DATA MODEL
import { GroceryTwoCarouselItem } from "models/Carousel.model";
// STYLED COMPONENTS
import { GridItemOne, GridItemTwo, StyledRoot, StyledGrid } from "./styles";

// ========================================================================
type Props = { carouselData: GroceryTwoCarouselItem[] };
// ========================================================================

export default function Section1({ carouselData }: Props) {
  return (
    <StyledRoot className="mb-3">
      <HeroCarousel>
        {carouselData.map((item) => (
          <StyledGrid container key={item.id}>
            <GridItemOne size={{ sm: 7, xs: 12 }}>
              <Typography variant="h1">{item.title}</Typography>
              <Typography variant="h6">{item.description}</Typography>
              <Typography variant="h5">Try our mobile app!</Typography>
              <FooterApps appleStoreUrl="#" playStoreUrl="#" />
            </GridItemOne>

            <GridItemTwo size={{ sm: 5, xs: 12 }}>
              <LazyImage priority width={570} height={360} src={item.imgUrl} alt={item.title} />
            </GridItemTwo>
          </StyledGrid>
        ))}
      </HeroCarousel>
    </StyledRoot>
  );
}
