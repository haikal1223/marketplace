"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
// CUSTOM DATA MODEL
import Payment from "models/Payment.model";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  cvc: yup.string().required("Card CVC is required"),
  card_no: yup.string().required("Card No is required"),
  exp: yup.string().required("Card expiry date is required")
});

// ==============================================================
type Props = { payment: Payment };
// ==============================================================

export default function PaymentForm({ payment }: Props) {
  const initialValues = {
    exp: payment?.exp || "",
    cvc: payment?.cvc || "",
    card_no: payment?.card_no || "",
    name: payment?.payment_method || ""
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const handleSubmitForm = handleSubmit(async (values) => {
    setError(null);
    setSuccess(null);
    const res = await fetch(`/api/payments/${payment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exp: values.exp,
        cardNo: values.card_no,
        paymentMethod: values.name
      })
    });
    if (!res.ok) {
      setError("Gagal menyimpan metode pembayaran.");
      return;
    }
    setSuccess("Metode pembayaran berhasil diperbarui.");
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="card_no" label="Card Number" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="name" label="Name on Card" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="exp" label="Exp. Date" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="cvc" label="CVC" />
        </Grid>

        <Grid size={12}>
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            loading={isSubmitting}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
