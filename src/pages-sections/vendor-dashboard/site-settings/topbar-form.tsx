import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { FormProvider, TextField } from "components/form-hook";
import { fetchSiteSettings, saveSiteSettings } from "../settings-api";

export default function TopbarForm() {
  const initialValues: {
    phone: string;
    email: string;
    links: { _id: number; name: string; link: string }[];
  } = {
    phone: "",
    email: "",
    links: []
  };

  const methods = useForm({ defaultValues: initialValues });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: "links" });

  useEffect(() => {
    fetchSiteSettings()
      .then((s) => {
        if (s?.topbar) reset({ ...initialValues, ...s.topbar });
      })
      .catch(() => setError("Gagal memuat topbar setting."));
  }, [reset]);

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setSuccess(null);
    setError(null);
    try {
      await saveSiteSettings("topbar", values);
      setSuccess("Topbar setting tersimpan.");
    } catch {
      setError("Gagal menyimpan topbar setting.");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4">Top Bar Left Content</Typography>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            name="phone"
            color="info"
            size="medium"
            label="Phone"
            placeholder="0000000000"
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            color="info"
            name="email"
            size="medium"
            label="Email"
            placeholder="email@example.com"
          />
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Fragment>
          <Grid size={12}>
            <FlexBox alignItems="center" justifyContent="space-between">
              <Typography variant="h4">Top Bar Right</Typography>

              <Button
                color="info"
                variant="contained"
                onClick={() => append({ _id: Date.now(), name: "", link: "" })}>
                Add Item
              </Button>
            </FlexBox>
          </Grid>

          {fields.map((item, index) => (
            <Grid container spacing={2} size={12} key={item.id}>
              <Grid size={5}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  label="Name"
                  name={`links.${index}.name`}
                />
              </Grid>

              <Grid size={5}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  label="Link"
                  name={`links.${index}.link`}
                />
              </Grid>

              <Grid size={2}>
                <IconButton onClick={() => remove(index)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Fragment>

        <Grid size={12}>
          <Button loading={isSubmitting} type="submit" color="info" variant="contained">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
