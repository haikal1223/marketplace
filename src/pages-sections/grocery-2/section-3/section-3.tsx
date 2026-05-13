import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { StyledCard } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/grocery-2";

export default async function Section3() {
  const categories = await api.getCategories();
  if (!categories || !categories.length) return null;

  return (
    <div className="mb-3">
      <Typography variant="h2" sx={{ mb: 3 }}>
        Shop By Category
      </Typography>

      <Grid container spacing={3}>
        {categories.map(({ id, name, image, description, slug }) => (
          <Grid size={{ lg: 4, xs: 6 }} key={id}>
            <Link href={`/products/search?category=${slug}`}>
              <StyledCard>
                <Image width={46} height={46} alt={name} src={image!} />

                <div>
                  <p>{description}</p>
                  <h5>{name}</h5>
                </div>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
