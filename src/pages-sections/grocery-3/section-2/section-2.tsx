import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { StyledCard } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/grocery-3";

export default async function Section2() {
  const offers = await api.getOfferCards();
  if (!offers || !offers.length) return null;

  return (
    <Grid container spacing={3}>
      {offers.map((item, ind) => (
        <Grid key={ind} size={{ md: 6, xs: 12 }}>
          <Link href="/sales-1">
            <StyledCard>
              <div className="content">
                <p>{item.title}</p>
                <h3>{item.discountOffer}</h3>
                <Button color="primary" variant="outlined">
                  {item.buttonText}
                </Button>
              </div>

              <div className="img-wrapper">
                <LazyImage width={900} height={528} alt={item.title} src={item.imgUrl} />
              </div>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
