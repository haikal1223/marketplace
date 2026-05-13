"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

type Warehouse = {
  id: string;
  name: string;
  originDistrictId: string;
};

type City = {
  id: number | string;
  name: string;
};

export default function WarehousesForm() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [originDistrictId, setOriginDistrictId] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch("/api/vendor/warehouses")
      .then(async (res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data: Warehouse[]) => {
        if (!mounted) return;
        setWarehouses(data);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Gagal memuat gudang.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

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

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setOriginDistrictId("");
  };

  const handleStartEdit = (w: Warehouse) => {
    setEditingId(w.id);
    setName(w.name);
    setOriginDistrictId(w.originDistrictId);
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        originDistrictId: originDistrictId.trim()
      };

      if (!payload.name || !payload.originDistrictId) {
        setError("Nama gudang dan originDistrictId wajib diisi.");
        return;
      }

      const res = await fetch(
        editingId ? `/api/vendor/warehouses/${editingId}` : "/api/vendor/warehouses",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed");
      }

      const updatedListRes = await fetch("/api/vendor/warehouses");
      const updatedList = await updatedListRes.json();
      setWarehouses(updatedList);

      setSuccess(editingId ? "Gudang berhasil diperbarui." : "Gudang berhasil ditambahkan.");
      resetForm();
    } catch (e: any) {
      setError(e?.message ?? "Gagal menyimpan gudang.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    setSuccess(null);

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/vendor/warehouses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed");
      }

      const updatedListRes = await fetch("/api/vendor/warehouses");
      const updatedList = await updatedListRes.json();
      setWarehouses(updatedList);

      setSuccess("Gudang berhasil dihapus.");
      if (editingId === id) resetForm();
    } catch (e: any) {
      setError(e?.message ?? "Gagal menghapus gudang.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Warehouses (Asal Gudang)
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Stack spacing={2} sx={{ mb: 3 }}>
        {loading ? (
          <Typography variant="body2" color="text.secondary">
            Memuat gudang...
          </Typography>
        ) : warehouses.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Belum ada gudang. Tambahkan gudang terlebih dahulu.
          </Typography>
        ) : (
          warehouses.map((w) => (
            <Card key={w.id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Typography fontWeight={700}>{w.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Asal Kota: {cities.find((c) => String(c.id) === String(w.originDistrictId))?.name ?? w.originDistrictId}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => handleStartEdit(w)} aria-label="edit">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(w.id)}
                    color="error"
                    aria-label="delete">
                    <Delete fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          ))
        )}
      </Stack>

      {warehouses.length < 1 && (
        <Card variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={700}>
              {editingId ? "Edit Warehouse" : "Add Warehouse"}
            </Typography>

            {!editingId && warehouses.length >= 1 && (
              <Alert severity="info">
                Shop hanya boleh punya 1 warehouse pengiriman. Untuk perubahan origin, gunakan tombol
                edit.
              </Alert>
            )}

            <TextField
              label="Warehouse Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              disabled={!editingId && warehouses.length >= 1}
            />

            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="originCityId"
              label="Asal Kota *"
              value={originDistrictId}
              onChange={(e) => setOriginDistrictId(e.target.value)}
              disabled={loadingCities || (!editingId && warehouses.length >= 1)}
              slotProps={{
                input: {
                  endAdornment: loadingCities ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                }
              }}
            >
              {loadingCities ? (
                <MenuItem disabled>Memuat kota...</MenuItem>
              ) : cities.length === 0 ? (
                <MenuItem disabled>Gagal memuat kota. Coba refresh.</MenuItem>
              ) : (
                cities.map((c) => (
                  <MenuItem key={String(c.id)} value={String(c.id)}>
                    {c.name}
                  </MenuItem>
                ))
              )}
            </TextField>

            <Stack direction="row" spacing={1}>
              <Button
                loading={isSubmitting}
                variant="contained"
                onClick={handleSave}
                disabled={!editingId && warehouses.length >= 1}>
                {editingId ? "Save Changes" : "Add Warehouse"}
              </Button>
              {editingId && (
                <Button variant="outlined" disabled={isSubmitting} onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </Stack>
          </Stack>
        </Card>
      )}

    </Box>
  );
}

