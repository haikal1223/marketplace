import { withMask } from "use-mask-input";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Checkbox, TextField } from "components/form-hook";

export default function PaymentForm() {
  return (
    <Box mb={3}>
      <Typography fontWeight={500} variant="body1">
        Enter Card Information
      </Typography>

      <Grid container spacing={2} mt={1.5}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField fullWidth label="Name" size="medium" name="cardHolderName" />
        </Grid>

        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField
            fullWidth
            size="medium"
            label="Card No"
            name="cardNo"
            inputRef={withMask("9999 9999 9999 9999")}
          />
        </Grid>

        <Grid size={{ sm: 2, xs: 6 }}>
          <TextField
            fullWidth
            label="Expiry"
            size="medium"
            name="cardExpiry"
            inputRef={withMask("99/9999")}
          />
        </Grid>

        <Grid size={{ sm: 2, xs: 6 }}>
          <TextField
            fullWidth
            label="CVC"
            size="medium"
            name="cardCVC"
            inputRef={withMask("999")}
          />
        </Grid>

        <Grid size={12}>
          <Checkbox size="small" name="saveCard" label="Save this card" />
        </Grid>
      </Grid>
    </Box>
  );
}
