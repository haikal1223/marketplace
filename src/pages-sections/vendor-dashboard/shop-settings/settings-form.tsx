import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";

const validationSchema = yup.object().shape({
  shopName: yup.string().required("Shop Name is required!"),
  shopPhone: yup.string().required("Shop Phone is required!"),
  category: yup.string().required("Category is required!"),
  description: yup.string().required("Description is required!"),
  shopAddress: yup.string().required("Shop Address is required!"),
  order: yup.number().required("Orders is required!")
});

export default function SettingsForm() {
  const initialValues = {
    order: 10,
    category: "fashion",
    shopName: "The Icon Style",
    shopPhone: "+123 4567 8910",
    shopAddress: "4990 Hide A Way Road Santa Clara, CA 95050.",
    description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomized words which don't look even slightly believable.`
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  useEffect(() => {
    fetch("/api/vendor/shop-settings")
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((shop) => {
        reset((prev) => ({
          ...prev,
          shopName: shop.name ?? prev.shopName,
          shopPhone: shop.phone ?? prev.shopPhone,
          shopAddress: shop.address ?? prev.shopAddress
        }));
      })
      .catch(() => setError("Gagal memuat data toko."));
  }, [reset]);

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setSuccess(null);
    setError(null);

    const res = await fetch("/api/vendor/shop-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.shopName,
        phone: values.shopPhone,
        address: values.shopAddress
      })
    });

    if (!res.ok) {
      setError("Gagal menyimpan pengaturan toko.");
      return;
    }

    setSuccess("Pengaturan toko berhasil disimpan.");
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Stack spacing={3} mb={3}>
        <TextField color="info" size="medium" name="shopName" label="Shop Name *" />
        <TextField color="info" size="medium" name="shopPhone" label="Shop Phone" />
        <TextField
          select
          fullWidth
          color="info"
          size="medium"
          name="category"
          placeholder="Category"
          label="Select Category">
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="fashion">Fashion</MenuItem>
        </TextField>
        <TextField
          rows={6}
          multiline
          fullWidth
          color="info"
          size="medium"
          name="description"
          label="Description (optional)"
        />

        <TextField color="info" size="medium" name="shopAddress" label="Shop Address" />
        <TextField name="order" color="info" size="medium" type="number" label="Minimum Order *" />
      </Stack>

      <Button loading={isSubmitting} type="submit" color="info" variant="contained">
        Save Changes
      </Button>
    </FormProvider>
  );
}
