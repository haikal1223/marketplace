"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";

const initialValues = { message: "" };

const validationSchema = yup.object().shape({
  message: yup.string().required("Message is required")
});

export default function MessageForm({ slug }: { slug: string }) {
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmitForm = handleSubmit(async (values) => {
    setError(null);
    setSuccess(null);
    const res = await fetch("/api/tickets/single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, text: values.message })
    });
    if (!res.ok) {
      setError("Gagal mengirim pesan.");
      return;
    }
    reset({ message: "" });
    setSuccess("Pesan berhasil dikirim.");
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        rows={8}
        fullWidth
        multiline
        name="message"
        placeholder="Write your message here..."
        sx={{ mb: 3 }}
      />

      <Button size="large" loading={isSubmitting} type="submit" color="primary" variant="contained">
        Post message
      </Button>
    </FormProvider>
  );
}
