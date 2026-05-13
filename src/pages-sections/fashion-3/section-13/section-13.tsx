import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { ImageWrapper, InstagramIcon } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/fashion-3";

export default async function Section13() {
  const blogs = await api.getBlogs();
  if (!blogs || !blogs.length) return null;

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ mb: 4, fontSize: 24 }}>
        Our Instagram
      </Typography>

      <Grid container spacing={2}>
        {blogs.map(({ id, thumbnail }) => (
          <Grid size={{ md: 2, sm: 4, xs: 6 }} key={id}>
            <ImageWrapper>
              <LazyImage alt="post" width={220} height={220} src={thumbnail} />
              <InstagramIcon />
            </ImageWrapper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
