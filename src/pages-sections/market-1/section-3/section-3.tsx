import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
// LOCAL CUSTOM COMPONENT
import Card from "./card";
// STYLED COMPONENT
import { CardGrid } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section3() {
  const categories = await api.getCategories();
  if (!categories || categories.length === 0) return null;

  return (
    <Container>
      <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
        Custom solutions for your needs
      </Typography>

      <CardGrid>
        {categories.map((category) => (
          <Card
            key={category.id}
            name={category.name}
            image={category.image!}
            link={`/products/search?category=${category.slug}`}
          />
        ))}
      </CardGrid>
    </Container>
  );
}
