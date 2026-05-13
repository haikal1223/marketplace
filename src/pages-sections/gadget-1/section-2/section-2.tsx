import Link from "next/link";
import Image from "next/image";
//  MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENT
import Container from "components/Container";
import { SectionHeader } from "components/section-header";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/gadget-1";

export default async function Section2() {
  const categories = await api.getFeaturedCategories();
  if (!categories || !categories.length) return null;

  return (
    <Container>
      <SectionHeader title="Featured Categories" linkText="Browse All" seeMoreLink="#" />

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid key={category.id} size={{ lg: 3, md: 3, sm: 6, xs: 12 }}>
            <Link
              href={`/products/search?category=${category.title}`}
              aria-label={`View ${category.title}`}>
              <StyledRoot>
                <Image
                  fill
                  alt={category.title}
                  src={category.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="content">
                  <Typography
                    className="title"
                    variant="body1"
                    fontWeight={600}
                    fontSize={{ sm: 22, xs: 20 }}>
                    {category.title}
                  </Typography>

                  <Typography variant="body1" fontSize={{ sm: 16, xs: 14 }}>
                    {category.totalProduct} Products
                  </Typography>
                </div>
              </StyledRoot>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
