import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { DiscountWrapper } from "./styles";

export default function DiscountSection() {
  return (
    <DiscountWrapper>
      <Grid container alignItems="center">
        <Grid className="content" size={{ xs: 12, md: 6, sm: 7, lg: 5 }}>
          <Typography variant="body1">Till 10 Dec, 2021</Typography>
          <Typography variant="h1">25% Special Off Today Only for Vegetables</Typography>
          <Button href="/sales-1" color="primary" variant="contained" LinkComponent={Link}>
            Shop Now
          </Button>
        </Grid>

        <Grid offset={{ md: 1, lg: 2 }} size={{ xs: 12, md: 5, sm: 5, lg: 5 }}>
          <LazyImage
            width={900}
            height={528}
            alt="discount"
            src="/assets/images/Groceries Shop/vagitable.png"
          />
        </Grid>
      </Grid>
    </DiscountWrapper>
  );
}
