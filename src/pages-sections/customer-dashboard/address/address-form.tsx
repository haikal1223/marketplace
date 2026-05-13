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
import Address from "models/Address.model";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  contact: yup.string().required("Contact is required")
});

// =============================================================
type Props = { address: Address };
// =============================================================

export default function AddressForm({ address }: Props) {
  const initialValues = {
    name: address.title || "",
    contact: address.phone || "",
    address: address.street || ""
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
    const res = await fetch(`/api/address/user/${address.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.name,
        phone: values.contact,
        street: values.address
      })
    });
    if (!res.ok) {
      setError("Gagal menyimpan alamat.");
      return;
    }
    setSuccess("Alamat berhasil diperbarui.");
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <TextField fullWidth size="medium" name="name" label="Name" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField fullWidth size="medium" name="address" label="Address Line" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField fullWidth size="medium" label="Phone" name="contact" />
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
