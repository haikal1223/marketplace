import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
import CategoryCard1 from "components/category-cards/category-card-1";
// CSS ANIMATION NAME
import { AdTitle1, AdWrapper } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-3";

export default async function Section3() {
  const categories = await api.getCategories();
  if (!categories || !categories.length) return null;

  return (
    <Container>
      <Grid container spacing={3}>
        {categories.map((item) => (
          <Grid size={{ lg: 2, md: 3, sm: 4, xs: 6 }} key={item.id}>
            <CategoryCard1
              image={item.image!}
              title={item.name}
              href={`/products/search?category=${encodeURIComponent(item.slug)}`}
            />
          </Grid>
        ))}

        <Grid size={12}>
          <AdWrapper>
            <AdTitle1>Black friday sale!</AdTitle1>

            <p className="text-wrapper">
              <span className="slide-text">
                Pay only for <span className="slide-text-bold">your loving electronics</span>
              </span>
            </p>

            <div className="btn-shop">
              <Button>Shop Now</Button>
            </div>
          </AdWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
