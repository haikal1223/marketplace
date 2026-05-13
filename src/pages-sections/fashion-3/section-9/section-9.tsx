import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENT
import Heading from "../shared/heading";
import ProductCard from "./product-card";
// STYLED COMPONENT
import { BannerWrapper } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/fashion-3";
// IMPORT BANNER IMAGE
import banner from "../../../../public/assets/images/banners/banner-50.jpg";

export default async function Section9() {
  const products = await api.getBestProducts();
  if (!products || !products.length) return null;

  return (
    <Container className="mt-4">
      <Heading title="Selling Products" />

      <Grid container spacing={2}>
        <Grid size={{ md: 2, xs: 12 }} display={{ md: "block", xs: "none" }}>
          <BannerWrapper>
            <LazyImage src={banner} alt="banner" />

            <div className="content">
              <Typography variant="h3" lineHeight={1.3} fontSize={{ lg: 36, xs: 28 }}>
                50% OFF
              </Typography>

              <Typography variant="body1" fontSize={{ md: 16, xs: 14 }}>
                LIMITED TIME OFFER!
              </Typography>
            </div>
          </BannerWrapper>
        </Grid>

        <Grid container spacing={2} size={{ md: 10, xs: 12 }}>
          {products.map((product) => (
            <Grid size={{ md: 4, sm: 6, xs: 12 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
