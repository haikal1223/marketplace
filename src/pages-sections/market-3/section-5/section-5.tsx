import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import IconLink from "components/icon-link";
import Container from "components/Container";
import ProductsCarousel from "./products-carousel";
import ProductCard10 from "components/product-cards/product-card-10";
// CUSTOM DATA MODEL
import { CategoryBasedProducts } from "models/Market-2.model";
// STYLED COMPONENTS
import { StyledCard, StyledListItem } from "./styles";

// ======================================================================
type Props = { data: CategoryBasedProducts };
// ======================================================================

export default function Section5({ data }: Props) {
  if (!data) return null;
  const { category, products } = data;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid size={{ md: 3, xs: 12 }}>
          <StyledCard elevation={0}>
            <Typography variant="h3" lineHeight={1} fontSize={{ sm: 27, xs: 22 }}>
              {category.title}
            </Typography>

            <List sx={{ mb: 3 }}>
              {category.children.map((item) => (
                <StyledListItem key={item}>{item}</StyledListItem>
              ))}
            </List>

            <IconLink url="/" title="Browse All" />
          </StyledCard>
        </Grid>

        {/* CATEGORY BASED PRODUCTS CAROUSEL */}
        <Grid size={{ md: 9, xs: 12 }}>
          <ProductsCarousel>
            {products.map((product) => (
              <ProductCard10 product={product} key={product.id} />
            ))}
          </ProductsCarousel>
        </Grid>
      </Grid>
    </Container>
  );
}
