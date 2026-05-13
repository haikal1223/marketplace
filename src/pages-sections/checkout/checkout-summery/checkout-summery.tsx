"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import ListItem from "./list-item";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// CHECKOUT CONTEXT
import { useCheckout } from "../checkout-context";

export default function CheckoutSummary() {
  const { state } = useCart();
  const { selectedCourierByShopId } = useCheckout();

  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingCost = Object.values(selectedCourierByShopId).reduce((sum, c) => sum + (c?.cost ?? 0), 0);
  const total = subtotal + shippingCost;

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        p: 3,
        position: "sticky",
        top: 16,
        backgroundColor: theme.palette.grey[50],
        border: `1px solid ${theme.palette.divider}`
      })}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Ringkasan Pesanan
      </Typography>

      {state.cart.map((item) => (
        <Stack
          key={item.id}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}>
          <Typography variant="body2" sx={{ flex: 1, mr: 1 }}>
            {item.qty}x {item.title}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {currency(item.price * item.qty)}
          </Typography>
        </Stack>
      ))}

      <Divider sx={{ my: 2 }} />

      <ListItem title="Subtotal" value={subtotal} />
      <ListItem title="Ongkos Kirim" value={shippingCost} />

      {Object.values(selectedCourierByShopId).some(Boolean) && (
        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
          Ongkir dihitung per vendor (multi-kurir)
        </Typography>
      )}

      <ListItem title="Diskon" value={0} />

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body2" color="text.secondary">
          Pembayaran:
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          COD (Bayar di Tempat)
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Total
        </Typography>
        <Typography variant="h5" fontWeight={700} color="primary.main">
          {currency(total)}
        </Typography>
      </Stack>
    </Card>
  );
}
