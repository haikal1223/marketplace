import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENT
import DropZone from "components/DropZone";
import { FormProvider, TextField } from "components/form-hook";
import { fetchSiteSettings, saveSiteSettings } from "../settings-api";

const validationSchema = yup.object().shape({
  site_name: yup.string().required("site name is required"),
  site_description: yup.string().required("site description is required"),
  site_banner_text: yup.string().required("site banner text required")
});

export default function GeneralForm() {
  const initialValues = {
    site_name: "",
    site_description: "",
    site_banner_text: ""
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
    fetchSiteSettings()
      .then((s) => {
        if (s?.general) reset({ ...initialValues, ...s.general });
      })
      .catch(() => setError("Gagal memuat general setting."));
  }, [reset]);

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setSuccess(null);
    setError(null);
    try {
      await saveSiteSettings("general", values);
      setSuccess("General setting tersimpan.");
    } catch {
      setError("Gagal menyimpan general setting.");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={3}>
        <Grid size={12}>
          <DropZone onChange={(files) => console.log(files)} />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField fullWidth color="info" size="medium" name="site_name" label="Site Name" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="site_description"
            label="Site Description"
          />
        </Grid>

        <Grid size={12}>
          <TextField
            rows={6}
            fullWidth
            multiline
            color="info"
            size="medium"
            name="site_banner_text"
            label="Site Banner Text"
          />
        </Grid>

        <Grid size={12}>
          <DropZone
            onChange={(files) => {
              console.log(files);
            }}
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
