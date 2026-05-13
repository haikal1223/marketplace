"use client";

import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

type City = {
  id: number | string;
  name: string;
};

export function BecomeVendorPageView() {
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [warehouseName, setWarehouseName] = useState("");
  const [originDistrictId, setOriginDistrictId] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoadingCities(true);
    fetch("/api/shipping/cities/all")
      .then(async (res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data: City[]) => {
        if (!mounted) return;
        setCities(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!mounted) return;
        setCities([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingCities(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const shopNameTrimmed = shopName.trim();
    const phoneTrimmed = phone.trim();
    const addressTrimmed = address.trim();
    const warehouseNameTrimmed = warehouseName.trim();
    const originTrimmed = originDistrictId.trim();

    if (!shopNameTrimmed) return setError("Nama toko wajib diisi.");
    if (!phoneTrimmed) return setError("Nomor HP wajib diisi.");
    if (!addressTrimmed) return setError("Alamat wajib diisi.");
    if (!warehouseNameTrimmed) return setError("Nama gudang wajib diisi.");
    if (!originTrimmed) return setError("Asal kota (gudang) wajib dipilih.");

    setLoading(true);
    try {
      const res = await fetch("/api/vendor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopName: shopNameTrimmed,
          phone: phoneTrimmed,
          address: addressTrimmed,
          warehouseName: warehouseNameTrimmed,
          originDistrictId: originTrimmed
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Gagal mengajukan vendor.");
        return;
      }

      router.push("/vendor/shop-settings");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={4} maxWidth={720} margin="auto">
      <Typography variant="h3" sx={{ mb: 2 }}>
        Become a Vendor
      </Typography>

      <Card sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Data toko
          </Typography>

          <TextField
            fullWidth
            label="Nama Toko"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            margin="normal"
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Nomor HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            disabled={loading}
            multiline
            minRows={3}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Gudang pengiriman
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Satu toko hanya boleh punya satu gudang asal pengiriman. Ini dipakai untuk hitung ongkir
            (Raja Ongkir).
          </Typography>

          <TextField
            fullWidth
            label="Nama gudang"
            placeholder="contoh: Gudang Utama"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            margin="normal"
            disabled={loading}
          />

          <TextField
            select
            fullWidth
            label="Asal kota *"
            value={originDistrictId}
            onChange={(e) => setOriginDistrictId(e.target.value)}
            margin="normal"
            disabled={loading || loadingCities}
            slotProps={{
              input: {
                endAdornment: loadingCities ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
              }
            }}
          >
            {loadingCities ? (
              <MenuItem disabled>Memuat kota...</MenuItem>
            ) : cities.length === 0 ? (
              <MenuItem disabled>Gagal memuat kota. Coba refresh halaman.</MenuItem>
            ) : (
              cities.map((c) => (
                <MenuItem key={String(c.id)} value={String(c.id)}>
                  {c.name}
                </MenuItem>
              ))
            )}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="info"
            disabled={loading}
            sx={{ mt: 2, minWidth: 200 }}
          >
            {loading ? <CircularProgress size={18} /> : "Apply & Setup Shop"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default BecomeVendorPageView;
