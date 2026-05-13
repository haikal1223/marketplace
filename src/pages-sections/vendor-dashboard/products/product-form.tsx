"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/flex-box";
import { FormProvider, TextField } from "components/form-hook";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
// CUSTOM DATA MODEL
import { PreviewFile } from "models/Common";

// FORM FIELDS VALIDATION SCHEMA
const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  category: yup
    .array(yup.string())
    .min(1, "Category must have at least 1 items")
    .required("Category is required!"),
  description: yup.string().required("Description is required!"),
  stock: yup.string().required("Stock is required!"),
  price: yup.string().required("Price is required!"),
  sale_price: yup.string().optional(),
  tags: yup.string().required("Tags is required!"),
  brandId: yup.string().required("Brand is required!"),
  // warehouseId is optional on purpose; backend will fallback to the first warehouse.
  warehouseId: yup.string().optional()
});

type FormValues = yup.InferType<typeof validationSchema>;

// ================================================================
interface Props {
  initialData?: Partial<FormValues> & { slug?: string; thumbnail?: string; brandId?: string };
}
// ================================================================

export default function ProductForm({ initialData }: Props) {
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>(initialData?.thumbnail ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [brands, setBrands] = useState<Array<{ id: string; name: string }>>([]);
  const [warehouses, setWarehouses] = useState<Array<{ id: string; name: string; originDistrictId: string }>>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  // Load categories from API
  useEffect(() => {
    fetch("/api/admin/category")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.categories ?? [];
        setCategories(list);
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setBrands(list.map((b: { id: string; name: string }) => ({ id: b.id, name: b.name })));
      })
      .catch(() => { });
  }, []);

  // Load vendor warehouses from API
  useEffect(() => {
    let mounted = true;
    setLoadingWarehouses(true);

    fetch("/api/vendor/warehouses")
      .then(async (r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setWarehouses(Array.isArray(data) ? data : []);
      })
      .catch(() => { })
      .finally(() => {
        if (!mounted) return;
        setLoadingWarehouses(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const initialValues: FormValues = {
    name: initialData?.name ?? "",
    tags: initialData?.tags ?? "",
    stock: initialData?.stock ?? "",
    price: initialData?.price ?? "",
    sale_price: initialData?.sale_price ?? "",
    description: initialData?.description ?? "",
    category: initialData?.category ?? [],
    brandId: (initialData as any)?.brandId ?? "",
    warehouseId: (initialData as any)?.warehouseId ?? ""
  };

  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema) as Resolver<FormValues>
  });

  // Upload file to server and get back its URL
  const handleChangeDropZone = async (newFiles: File[]) => {
    const previewed = newFiles.map((f) =>
      Object.assign(f, { preview: URL.createObjectURL(f) })
    ) as PreviewFile[];
    setFiles(previewed);

    if (newFiles.length === 0) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", newFiles[0]);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setThumbnail(url);
      } else {
        setError("Gagal upload gambar. Coba lagi.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = (file: File) => () => {
    setFiles((prev) => prev.filter((item) => item.name !== file.name));
    setThumbnail("");
  };

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const handleSubmitForm = handleSubmit(async (values) => {
    setError(null);
    setSuccess(false);

    const isEdit = !!initialData?.slug;
    const url = isEdit
      ? `/api/vendor/products/${initialData!.slug}`
      : "/api/vendor/products";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, thumbnail })
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menyimpan produk.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/vendor/products"), 1000);
  });

  const isLoading = isSubmitting || uploading;

  return (
    <Card className="p-3">
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Produk berhasil disimpan!</Alert>}

        <Grid container spacing={3}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth name="name" label="Product Name"
              color="info" size="medium" placeholder="e.g. Wireless Headphones"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              select fullWidth color="info" size="medium"
              name="category" placeholder="Category"
              label="Select Category"
              slotProps={{ select: { multiple: true } }}>
              {categories.length > 0
                ? categories.map((c) => (
                  <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                ))
                : <MenuItem disabled>Loading categories...</MenuItem>
              }
            </TextField>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField select fullWidth color="info" size="medium" name="brandId" label="Brand">
              {brands.length > 0 ? (
                brands.map((b) => (
                  <MenuItem key={b.id} value={b.id}>
                    {b.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading brands...</MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid size={12}>
            <DropZone onChange={handleChangeDropZone} />

            {uploading && (
              <FlexBox alignItems="center" gap={1} mt={1}>
                <CircularProgress size={16} />
                <span style={{ fontSize: 13 }}>Mengupload gambar...</span>
              </FlexBox>
            )}

            {/* Preview thumbnail after upload */}
            {thumbnail && !uploading && (
              <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                <UploadImageBox>
                  <Box component="img" src={thumbnail} width="100%" />
                  <StyledClear onClick={() => setThumbnail("")} />
                </UploadImageBox>
              </FlexBox>
            )}

            {/* Local previews (before upload completes) */}
            {!thumbnail && files.length > 0 && (
              <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                {files.map((file, index) => (
                  <UploadImageBox key={index}>
                    <Box component="img" src={file.preview} width="100%" />
                    <StyledClear onClick={handleFileDelete(file)} />
                  </UploadImageBox>
                ))}
              </FlexBox>
            )}
          </Grid>

          <Grid size={12}>
            <TextField
              rows={6} multiline fullWidth color="info" size="medium"
              name="description" label="Description" placeholder="Describe your product..."
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth name="stock" color="info" size="medium"
              label="Stock" placeholder="e.g. 100"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth name="tags" label="Tags" color="info" size="medium"
              placeholder="e.g. electronics, gadget, wireless"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth name="price" color="info" size="medium"
              type="number" label="Regular Price" placeholder="e.g. 299000"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth color="info" size="medium" type="number"
              name="sale_price" label="Sale Price (optional)" placeholder="e.g. 249000"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="warehouseId"
              label="Warehouse (Asal Gudang)"
              disabled={loadingWarehouses || warehouses.length === 0}>
              {loadingWarehouses ? (
                <MenuItem disabled>Memuat gudang...</MenuItem>
              ) : warehouses.length === 0 ? (
                <MenuItem disabled>Belum ada gudang. Isi dulu di Shop Settings.</MenuItem>
              ) : (
                warehouses.map((w) => (
                  <MenuItem key={w.id} value={w.id}>
                    {w.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <Button
              loading={isLoading}
              variant="contained"
              color="info"
              type="submit"
              disabled={uploading}>
              Save Product
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
