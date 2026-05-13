import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENT
import Favorite from "@mui/icons-material/Favorite";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Countdown } from "components/countdown";
// STYLED COMPONENT
import { ContentWrapper, FavoriteButton, ImageWrapper } from "./styles";

// ================================================================
interface Props {
  imgUrl: string;
  expireDate: number;
  buttonText: string;
  productName: string;
  offerName: string;
  offerTagline: string;
  offerDescription: string;
}
// ================================================================

export default function CarouselCard({
  imgUrl,
  offerName,
  expireDate,
  buttonText,
  productName,
  offerTagline,
  offerDescription
}: Props) {
  return (
    <Grid container alignItems="center">
      <Grid size={{ lg: 6, md: 5, xs: 12 }}>
        <ImageWrapper>
          <LazyImage fill src={imgUrl} alt={productName} sizes="(max-width: 768px) 100vw, 100vw" />
        </ImageWrapper>
      </Grid>

      <Grid size={{ lg: 4, md: 5, xs: 12 }}>
        <ContentWrapper>
          <Typography variant="h3">{offerName}</Typography>
          <Typography variant="h2">{productName}</Typography>
          <Typography variant="body1">{offerDescription}</Typography>
          <Typography variant="h4">{offerTagline}</Typography>

          <Countdown expireDate={expireDate} />

          <div className="buttons">
            <Button size="large" color="primary" disableElevation variant="contained">
              {buttonText}
            </Button>

            <FavoriteButton>
              <Favorite />
            </FavoriteButton>
          </div>
        </ContentWrapper>
      </Grid>
    </Grid>
  );
}
