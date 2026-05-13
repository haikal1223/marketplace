import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// ==============================================================
type Props = { order: Order };
// ==============================================================

export default function OrderSummery({ order }: Props) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.productPrice * item.productQuantity,
    0
  );
  const shippingCost = order.shippingCost ?? 0;

  return (
    <Grid container spacing={3}>
      <Grid size={{ md: 6, xs: 12 }}>
        <Card elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "grey.100" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Alamat Pengiriman
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {order.shippingAddress}
          </Typography>

          {(order.courierName || order.courierService) && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Kurir Pengiriman
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {order.courierName} — {order.courierService}
              </Typography>
              {order.courierEtd && (
                <Typography variant="body2" color="text.secondary">
                  Estimasi tiba: {order.courierEtd}
                </Typography>
              )}
            </>
          )}
        </Card>
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <Card elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "grey.100" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Ringkasan Pembayaran
          </Typography>

          <ListItem title="Subtotal:" value={currency(subtotal)} />
          <ListItem title="Ongkos Kirim:" value={currency(shippingCost)} />
          <ListItem title="Diskon:" value={`- ${currency(order.discount ?? 0)}`} />

          <Divider sx={{ mb: 1 }} />

          <FlexBetween mb={2}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{currency(order.totalPrice)}</Typography>
          </FlexBetween>

          <FlexBetween>
            <Typography variant="body2" color="text.secondary">
              Metode Pembayaran:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {order.paymentMethod ?? "COD"}
            </Typography>
          </FlexBetween>
        </Card>
      </Grid>
    </Grid>
  );
}

function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <FlexBetween mb={1}>
      <Typography color="text.secondary" variant="body1">
        {title}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </FlexBetween>
  );
}
