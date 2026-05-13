import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
import { fetchSiteSettings, saveSiteSettings } from "../settings-api";

export default function ShippingVatForm() {
  const methods = useForm({
    defaultValues: {
      vat: 2,
      shipping: 10
    }
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  useEffect(() => {
    fetchSiteSettings()
      .then((s) => {
        if (s?.shippingVat) reset({ shipping: s.shippingVat.shipping ?? 0, vat: s.shippingVat.vat ?? 0 });
      })
      .catch(() => setError("Gagal memuat shipping & VAT setting."));
  }, [reset]);

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setSuccess(null);
    setError(null);
    try {
      await saveSiteSettings("shippingVat", values);
      setSuccess("Shipping & VAT setting tersimpan.");
    } catch {
      setError("Gagal menyimpan shipping & VAT setting.");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h4">Shipping and Vat</Typography>
        </Grid>

        <Grid size={{ md: 7, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            type="number"
            name="shipping"
            label="Shipping Charge"
          />
        </Grid>

        <Grid size={{ md: 7, xs: 12 }}>
          <TextField
            fullWidth
            name="vat"
            color="info"
            size="medium"
            type="number"
            label="VAT (%)"
          />
        </Grid>

        <Grid size={12}>
          <Button loading={isSubmitting} type="submit" color="info" variant="contained">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
