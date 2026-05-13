import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// ==============================================================
interface Props {
  total: number;
  discount: number;
  shippingCost?: number;
  paymentMethod?: string | null;
  courierName?: string | null;
  courierService?: string | null;
}
// ==============================================================

export default function TotalSummery({ total, discount, shippingCost, paymentMethod, courierName, courierService }: Props) {
  const subtotal = total - (shippingCost ?? 0) + (discount ?? 0);

  return (
    <Card sx={{ px: 3, py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Total Summary
      </Typography>

      <FlexBetween mb={1.5}>
        <Typography variant="body1" sx={{ color: "grey.600" }}>
          Subtotal:
        </Typography>
        <Typography variant="h6">{currency(subtotal > 0 ? subtotal : total)}</Typography>
      </FlexBetween>

      <FlexBetween mb={1.5}>
        <Typography variant="body1" sx={{ color: "grey.600" }}>
          Ongkos Kirim{courierName ? ` (${courierName}${courierService ? " - " + courierService : ""})` : ""}:
        </Typography>
        <Typography variant="h6">{currency(shippingCost ?? 0)}</Typography>
      </FlexBetween>

      <FlexBetween mb={1.5}>
        <Typography variant="body1" sx={{ color: "grey.600" }}>
          Diskon:
        </Typography>
        <Typography variant="h6">- {currency(discount ?? 0)}</Typography>
      </FlexBetween>

      <Divider sx={{ my: 2 }} />

      <FlexBetween mb={2}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{currency(total)}</Typography>
      </FlexBetween>

      <FlexBetween>
        <Typography variant="body2" color="text.secondary">
          Metode Pembayaran:
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {paymentMethod ?? "COD"}
        </Typography>
      </FlexBetween>
    </Card>
  );
}
