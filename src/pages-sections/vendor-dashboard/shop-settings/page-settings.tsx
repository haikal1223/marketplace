"use client";

import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
// MUI ICON COMPONENT
import Delete from "@mui/icons-material/Delete";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/flex-box";

type LinkRow = { id: string; label: string; url: string };

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Upload failed");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}

export default function PageSettings() {
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [mainBannerUrl, setMainBannerUrl] = useState("");
  const [productsBannerUrl, setProductsBannerUrl] = useState("");
  const [listingCategory, setListingCategory] = useState("fashion");
  const [links, setLinks] = useState<LinkRow[]>([]);

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingProducts, setUploadingProducts] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    Promise.all([fetch("/api/vendor/shop-settings"), fetch("/api/vendor/site-settings")])
      .then(async ([shopRes, siteRes]) => {
        if (!shopRes.ok || !siteRes.ok) throw new Error("failed");
        return Promise.all([shopRes.json(), siteRes.json()]);
      })
      .then(([shop, site]) => {
        if (cancelled) return;
        setMainBannerUrl(typeof shop.coverPicture === "string" ? shop.coverPicture : "");
        const g = site.general ?? {};
        setProductsBannerUrl(typeof g.productsPageBannerUrl === "string" ? g.productsPageBannerUrl : "");
        setListingCategory(typeof g.shopListingCategory === "string" ? g.shopListingCategory : "fashion");
        const raw = g.customLinks;
        if (Array.isArray(raw) && raw.length > 0) {
          setLinks(
            raw.map((item: unknown, i: number) => {
              const o = item as { label?: string; url?: string };
              return {
                id: `L-${i}-${o.url ?? ""}`,
                label: typeof o.label === "string" ? o.label : "",
                url: typeof o.url === "string" ? o.url : ""
              };
            })
          );
        } else {
          setLinks([{ id: "L-default", label: "", url: "" }]);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError("Gagal memuat pengaturan halaman toko.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const onMainBannerFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setUploadingMain(true);
    setSaveError(null);
    try {
      const url = await uploadImage(file);
      setMainBannerUrl(url);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Upload banner gagal.");
    } finally {
      setUploadingMain(false);
    }
  }, []);

  const onProductsBannerFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setUploadingProducts(true);
    setSaveError(null);
    try {
      const url = await uploadImage(file);
      setProductsBannerUrl(url);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Upload banner gagal.");
    } finally {
      setUploadingProducts(false);
    }
  }, []);

  const handleAddLink = () => {
    setLinks((s) => [...s, { id: `L-${Date.now()}`, label: "", url: "" }]);
  };

  const handleDeleteLink = (id: string) => () => {
    setLinks((s) => (s.length <= 1 ? s : s.filter((item) => item.id !== id)));
  };

  const updateLink = (id: string, field: "label" | "url", value: string) => {
    setLinks((s) => s.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSuccess(null);
    try {
      const shopRes = await fetch("/api/vendor/shop-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverPicture: mainBannerUrl })
      });
      if (!shopRes.ok) throw new Error("shop");

      const customLinks = links
        .map(({ label, url }) => ({ label: label.trim(), url: url.trim() }))
        .filter((l) => l.url !== "");

      const siteRes = await fetch("/api/vendor/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "general",
          data: {
            productsPageBannerUrl: productsBannerUrl.trim(),
            shopListingCategory: listingCategory,
            customLinks
          }
        })
      });
      if (!siteRes.ok) throw new Error("site");

      setSuccess("Pengaturan halaman toko disimpan. Banner utama tampil di halaman publik toko; banner katalog & tautan kustom di area produk.");
    } catch {
      setSaveError("Gagal menyimpan. Pastikan Anda login sebagai vendor dan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <FlexBox justifyContent="center" py={4}>
        <CircularProgress color="info" />
      </FlexBox>
    );
  }

  return (
    <div>
      {loadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
      )}
      {saveError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSaveError(null)}>
          {saveError}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Banner utama memperbarui gambar header toko (sama dengan cover toko di halaman publik). Banner halaman produk
        muncul di atas daftar produk. Tautan kustom ditampilkan di kartu intro toko (bersama ikon sosial media dari
        profil toko Anda).
      </Typography>

      <Stack spacing={3} mb={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Pratinjau banner utama
          </Typography>
          {mainBannerUrl ? (
            <Box
              sx={{
                mb: 2,
                height: 120,
                borderRadius: 1,
                background: `url(${mainBannerUrl}) center/cover`,
                border: 1,
                borderColor: "divider"
              }}
            />
          ) : null}
          {uploadingMain ? (
            <FlexBox justifyContent="center" py={2}>
              <CircularProgress size={28} />
            </FlexBox>
          ) : (
            <DropZone
              onChange={onMainBannerFiles}
              info="Main Banner (1920 x 360) *. We had to limit height to maintain consistency. Some device both side of the banner might cropped for height limitation."
            />
          )}
        </Box>

        <TextField
          select
          fullWidth
          color="info"
          size="medium"
          label="Product listing highlight (tersimpan)"
          value={listingCategory}
          onChange={(e) => setListingCategory(e.target.value)}>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="fashion">Fashion</MenuItem>
        </TextField>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Pratinjau banner halaman semua produk
          </Typography>
          {productsBannerUrl ? (
            <Box
              sx={{
                mb: 2,
                height: 80,
                borderRadius: 1,
                background: `url(${productsBannerUrl}) center/cover`,
                border: 1,
                borderColor: "divider"
              }}
            />
          ) : null}
          {uploadingProducts ? (
            <FlexBox justifyContent="center" py={2}>
              <CircularProgress size={28} />
            </FlexBox>
          ) : (
            <DropZone
              onChange={onProductsBannerFiles}
              info="All products page banner * (Recommended size 1025x120). We had to limit height to maintain consistency. Some device both side of the banner might cropped for height limitation."
            />
          )}
        </Box>
      </Stack>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Tautan kustom (judul + URL, tampil di halaman publik toko)
      </Typography>
      <Box mb={2}>
        {links.map((item) => (
          <FlexBox gap={2} alignItems="flex-start" mb={2} key={item.id}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="Label"
              placeholder="Promo"
              value={item.label}
              onChange={(e) => updateLink(item.id, "label", e.target.value)}
            />
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="URL"
              placeholder="https://..."
              value={item.url}
              onChange={(e) => updateLink(item.id, "url", e.target.value)}
            />
            <Box flexShrink={0}>
              <IconButton onClick={handleDeleteLink(item.id)} aria-label="Hapus tautan">
                <Delete sx={{ color: "grey.600" }} />
              </IconButton>
            </Box>
          </FlexBox>
        ))}

        <Button color="info" variant="outlined" onClick={handleAddLink}>
          Add Link
        </Button>
      </Box>

      <Button color="info" variant="contained" loading={saving} onClick={() => void handleSave()}>
        Save shop page settings
      </Button>
    </div>
  );
}
