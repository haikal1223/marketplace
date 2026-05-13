import Link from "next/link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { LeftCard, RightCard, StyledButton } from "./styles";
// IMPORT IMAGES
import offer1 from "../../../../public/assets/images/Gift Shop/Offer Card.png";
import offer2 from "../../../../public/assets/images/Gift Shop/Offer 1.png";

export default function Section3() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 7 }}>
        <Link href="/sales-1">
          <LeftCard>
            <div className="content">
              <Typography variant="h5">Holiday’s Offer!</Typography>

              <Typography variant="h2" color="primary">
                Sale 50% Off
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                Use Code : Holi50
              </Typography>

              <StyledButton disableRipple disableTouchRipple>
                Shop Now
              </StyledButton>
            </div>

            <div className="img-wrapper">
              <LazyImage alt="offer" src={offer1} />
            </div>
          </LeftCard>
        </Link>
      </Grid>

      <Grid size={{ xs: 12, sm: 5 }}>
        <Link href="/sales-1">
          <RightCard>
            <div className="content">
              <Typography variant="h5">Shop Online Gift Under</Typography>
              <Typography variant="h2" color="primary">
                $20.00
              </Typography>
              <StyledButton>Shop Now</StyledButton>
            </div>

            <div className="img-wrapper">
              <LazyImage alt="offer" src={offer2} />
            </div>
          </RightCard>
        </Link>
      </Grid>
    </Grid>
  );
}
