"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
// CUSTOM DATA MODEL
import User from "models/User.model";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  contact: yup.string().required("Contact is required"),
  birthOfDate: yup.date().required("Birth date is required")
});

// ==============================================================
type Props = { user: User };
// ==============================================================

export default function ProfileEditForm({ user }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    email: user?.email || "",
    contact: user?.phone || "",
    lastName: user?.name?.lastName || "",
    firstName: user?.name?.firstName || "",
    birthOfDate: user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date()
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const handleSubmitForm = handleSubmit(async (values) => {
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.contact,
        dateOfBirth: values.birthOfDate?.toISOString()
      })
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menyimpan perubahan.");
      return;
    }

    setSuccess(true);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Profil berhasil disimpan!</Alert>}

      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="firstName" label="First Name" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="lastName" label="Last Name" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth name="email" type="email" label="Email" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <TextField size="medium" fullWidth label="Phone" name="contact" />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Controller
            name="birthOfDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                label="Birth Date"
                enableAccessibleFieldDOMStructure={false}
                slots={{ textField: MuiTextField }}
                slotProps={{
                  textField: {
                    sx: { mb: 1 },
                    size: "medium",
                    fullWidth: true,
                    error: Boolean(error),
                    helperText: error?.message || ""
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Button
            disableElevation
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
