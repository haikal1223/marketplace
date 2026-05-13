import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Done from "@mui/icons-material/Done";

import LazyImage from "components/LazyImage";
import { ImageBox, StyledRoot } from "./styles";

import productModelImage from "../../../../public/assets/images/landing/product-model.png";
import restApiImage from "../../../../public/assets/images/landing/rest-api-endpoint.png";

const MODEL_FEATURES = [
  "Product model",
  "User model",
  "Shop model",
  "Order model",
  "Address model",
  "20+ more models"
];

export default function Section5() {
  return (
    <StyledRoot>
      <Container maxWidth="lg">
        <div className="model-content">
          <Grid container spacing={{ md: 8, xs: 4 }} alignItems="center" justifyContent="center">
            <Grid size={{ lg: 4, md: 5, sm: 6, xs: 10 }}>
              <ImageBox>
                <LazyImage alt="product-model" src={productModelImage} />
              </ImageBox>
            </Grid>

            <Grid size={{ lg: 4, md: 5, sm: 6, xs: 10 }}>
              <Typography
                variant="h2"
                lineHeight={1.2}
                fontWeight={700}
                fontSize={{ md: 28, xs: 27 }}
                sx={{ maxWidth: 300 }}>
                Well-Structured Data with TypeScript
              </Typography>

              <Typography variant="body1" fontSize={16} sx={{ mt: 1, maxWidth: 250 }}>
                Robust and scalable data models for modern applications
              </Typography>

              <div className="list">
                {MODEL_FEATURES.map((item) => (
                  <div className="item" key={item}>
                    <Done color="success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="api-content">
          <Grid container spacing={{ md: 8, xs: 4 }} alignItems="center" justifyContent="center">
            <Grid size={{ lg: 4, md: 5, xs: 10 }} textAlign={{ xs: "center", md: "start" }}>
              <Typography
                variant="h2"
                lineHeight={1.2}
                fontWeight={700}
                fontSize={{ md: 28, xs: 27 }}
                sx={{ maxWidth: 300 }}>
                Flexible REST API Endpoints
              </Typography>

              <Typography variant="body1" sx={{ fontSize: 16, mt: 1 }}>
                Leverage pre-built data structures to effortlessly implement and scale your backend
                server with minimal setup.
              </Typography>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <ImageBox>
                <LazyImage src={restApiImage} alt="rest-api-endpoint" />
              </ImageBox>
            </Grid>
          </Grid>
        </div>

        <div className="server">
          <a href="https://www.getbazaar.io/" target="_blank" style={{ display: "block" }}>
            <LazyImage
              width={1000}
              height={250}
              alt="Bazaar server"
              src="https://ui-lib.com/wp-content/uploads/2023/10/bazaar-server.jpg"
            />
          </a>
        </div>
      </Container>
    </StyledRoot>
  );
}
