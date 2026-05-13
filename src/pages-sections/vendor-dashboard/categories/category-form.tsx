"use client";

import { useState } from "react";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/flex-box";
import { Checkbox, FormProvider, TextField } from "components/form-hook";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
// CUSTOM DATA MODEL
import { PreviewFile } from "models/Common";

// FORM FIELDS VALIDATION
const validationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  parent: yup.string().nullable().default(""),
  featured: yup.boolean().default(false)
});

// ================================================================
interface Props {}
// ================================================================

export default function CategoryForm(props: Props) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [parents, setParents] = useState<Array<{ id: string; name: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initialValues = { name: "", parent: "", featured: false };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setError(null);
    setSuccess(null);

    let image = "/assets/images/categories/1.jpg";
    if (files[0]) {
      const fd = new FormData();
      fd.append("file", files[0]);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (uploadRes.ok) {
        const upload = await uploadRes.json();
        image = upload.url ?? image;
      }
    }

    const payload = {
      name: values.name,
      slug: values.name.toLowerCase().replace(/\s+/g, "-"),
      featured: Boolean(values.featured),
      parentId: values.parent || null,
      image
    };

    const res = await fetch("/api/admin/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      setError("Gagal menyimpan kategori.");
      return;
    }
    setSuccess("Kategori berhasil disimpan.");
  });

  useEffect(() => {
    fetch("/api/admin/category")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setParents(Array.isArray(data) ? data.map((c: any) => ({ id: c.id, name: c.name })) : []))
      .catch(() => setParents([]));
  }, []);

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files: File[]) => {
    files.forEach((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setFiles(files as PreviewFile[]);
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: File) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  return (
    <Card className="p-3">
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Grid container spacing={3}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              color="info"
              size="medium"
              placeholder="Name"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="parent"
              placeholder="Parent Category"
              label="Select Parent Category">
              <MenuItem value="">No Parent</MenuItem>
              {parents.map((parent) => (
                <MenuItem key={parent.id} value={parent.id}>
                  {parent.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <DropZone onChange={(files) => handleChangeDropZone(files)} />

            <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
              {files.map((file, index) => {
                return (
                  <UploadImageBox key={index}>
                    <Box component="img" alt="product" src={file.preview} width="100%" />
                    <StyledClear onClick={handleFileDelete(file)} />
                  </UploadImageBox>
                );
              })}
            </FlexBox>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <Checkbox color="info" name="featured" label="Featured Category" />
          </Grid>

          <Grid size={12}>
            <Button loading={isSubmitting} variant="contained" color="info" type="submit">
              Save category
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
