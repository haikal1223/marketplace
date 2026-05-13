"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// LOCAL CUSTOM COMPONENT
import OrderActions from "../order-actions";
import TotalSummery from "../total-summery";
import PageWrapper from "../../page-wrapper";
import OrderedProduct from "../ordered-product";
import ShippingAddress from "../shipping-address";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// ==============================================================
type Props = { order: Order };
// ==============================================================

interface DetailsViewProps extends Props {
  statusUpdateUrl?: string;
}

export default function OrderDetailsPageView({
  order,
  statusUpdateUrl = `/api/admin/orders/${order.id}`
}: DetailsViewProps) {
  const buyer = order.user;

  return (
    <PageWrapper title="Detail pesanan">
      <Grid container spacing={3}>
        <Grid size={12}>
          <Card sx={{ p: 3 }}>
            <OrderActions
              id={order.id}
              createdAt={order.createdAt}
              status={order.status}
              updateUrl={statusUpdateUrl}
            />

            {buyer && (
              <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Pembeli
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {[buyer.firstName, buyer.lastName].filter(Boolean).join(" ") || "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {buyer.email ?? "—"}
                </Typography>
              </Box>
            )}

            {order.items.map((item) => (
              <OrderedProduct product={item} key={item.id} />
            ))}
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <ShippingAddress address={order.shippingAddress} />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TotalSummery
            total={order.totalPrice}
            discount={order.discount}
            shippingCost={order.shippingCost}
            paymentMethod={order.paymentMethod}
            courierName={order.courierName}
            courierService={order.courierService}
          />
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
