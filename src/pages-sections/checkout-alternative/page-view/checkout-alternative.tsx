import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import CheckoutForm from "../checkout-form";
import CheckoutSummery from "../checkout-summery";
// API FUNCTIONS
import { getAddresses, getDeliveryTimes, getCards } from "utils/__api__/checkout";

export default async function CheckoutAlternativePageView() {
  const [addresses, deliveryTimes, cards] = await Promise.all([
    getAddresses(),
    getDeliveryTimes(),
    getCards()
  ]);

  return (
    <Box bgcolor="grey.50" sx={{ py: { xs: 3, sm: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }} order={{ xs: 2, md: 1 }}>
            <CheckoutForm
              cards={cards}
              deliveryAddresses={addresses}
              deliveryTimes={deliveryTimes}
            />
          </Grid>

          <Grid size={{ md: 4, xs: 12 }} order={{ xs: 1, md: 2 }}>
            <CheckoutSummery />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
