import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
// CUSTOM COMPONENTS
import Card from "../card";
import { TextField } from "components/form-hook";
// LOCAL CUSTOM HOOK
import useDeliveryDate from "./use-delivery-date";
// LOCAL CUSTOM COMPONENT
import Heading from "../heading";
// TYPES
import { DeliveryTime } from "models/Common";

const SELECT_PROPS = {
  select: {
    MenuProps: {
      elevation: 2
    },
    IconComponent: (props: any) => (
      <SvgIcon viewBox="0 0 16 16" {...props} sx={{ fontSize: 27, padding: 0.7 }}>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M1.867 6.097a.75.75 0 0 1 1.036-.23L8 9.111l5.097-3.244a.75.75 0 0 1 .806 1.266l-5.5 3.5a.75.75 0 0 1-.806 0l-5.5-3.5a.75.75 0 0 1-.23-1.036"
          clipRule="evenodd"
        />
      </SvgIcon>
    )
  }
} as const;

// ==============================================================
type Props = { deliveryTimes: DeliveryTime[] };
// ==============================================================

export default function DeliveryDate({ deliveryTimes }: Props) {
  const { dates } = useDeliveryDate();

  return (
    <Card>
      <Heading number={1} title="Delivery Date and Time" />

      <Grid container spacing={2}>
        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField
            select
            fullWidth
            name="date"
            size="medium"
            label="Delivery Date"
            slotProps={SELECT_PROPS}>
            {dates.map((item) => (
              <MenuItem value={item.value} key={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField
            select
            fullWidth
            name="time"
            size="medium"
            label="Delivery Time"
            slotProps={SELECT_PROPS}>
            {deliveryTimes.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
