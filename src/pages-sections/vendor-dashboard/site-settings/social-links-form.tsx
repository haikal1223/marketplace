import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
// MUI ICON COMPONENTS
import Twitter from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
import { fetchSiteSettings, saveSiteSettings } from "../settings-api";
// CUSTOM ICON COMPONENTS
import PlayStore from "icons/PlayStore";
import AppleStore from "icons/AppleStore";

export default function SocialLinksForm() {
  const initialValues = {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    play_store: "",
    app_store: ""
  };

  const methods = useForm({ defaultValues: initialValues });
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
        if (s?.socialLinks) reset({ ...initialValues, ...s.socialLinks });
      })
      .catch(() => setError("Gagal memuat social links setting."));
  }, [reset]);

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setSuccess(null);
    setError(null);
    try {
      await saveSiteSettings("socialLinks", values);
      setSuccess("Social links setting tersimpan.");
    } catch {
      setError("Gagal menyimpan social links setting.");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h4">Social Links</Typography>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="facebook"
            label="Facebook"
            placeholder="https://example.com"
            slotProps={{
              input: {
                startAdornment: <Facebook fontSize="small" color="info" sx={{ mr: 1 }} />
              }
            }}
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="twitter"
            label="Twitter"
            placeholder="https://example.com"
            slotProps={{
              input: {
                startAdornment: <Twitter fontSize="small" color="info" sx={{ mr: 1 }} />
              }
            }}
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="instagram"
            label="Instagram"
            placeholder="https://example.com"
            slotProps={{
              input: {
                startAdornment: <Instagram fontSize="small" color="info" sx={{ mr: 1 }} />
              }
            }}
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="youtube"
            label="Youtube"
            placeholder="https://example.com"
            slotProps={{
              input: {
                startAdornment: <YouTube fontSize="small" color="info" sx={{ mr: 1 }} />
              }
            }}
          />
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12}>
          <Typography variant="h4">App Links</Typography>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="play_store"
            label="Play Store"
            placeholder="https://example.com"
            slotProps={{
              input: {
                startAdornment: <PlayStore fontSize="small" color="info" sx={{ mr: 1 }} />
              }
            }}
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            name="app_store"
            label="App Store"
            placeholder="https://example.com"
            slotProps={{
              input: {
                startAdornment: <AppleStore fontSize="small" color="info" sx={{ mr: 1 }} />
              }
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
