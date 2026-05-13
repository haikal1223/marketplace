"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { format } from "date-fns/format";

/** Must match prisma `OrderStatus` */
const ORDER_STATUSES = ["Pending", "Processing", "Delivered", "Cancelled"] as const;

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

// ==============================================================
interface Props {
  id: string;
  status: string;
  createdAt: Date | string;
  updateUrl?: string;
}
// ==============================================================

export default function OrderActions({
  id,
  createdAt,
  status,
  updateUrl = `/api/admin/orders/${id}`
}: Props) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    const previous = currentStatus;
    setCurrentStatus(newStatus);

    try {
      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setSnackbar({ open: true, message: `Status diperbarui menjadi "${newStatus}"`, severity: "success" });
        router.refresh();
      } else {
        let msg = "Gagal memperbarui status.";
        try {
          const data = await res.json();
          if (data?.error) msg = `${msg} ${data.error}`;
        } catch {
          /* ignore */
        }
        setCurrentStatus(previous);
        setSnackbar({ open: true, message: msg, severity: "error" });
      }
    } catch {
      setCurrentStatus(previous);
      setSnackbar({ open: true, message: "Gagal memperbarui status.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <FlexBox flexWrap="wrap" alignItems="center" columnGap={4} rowGap={1}>
        <Typography variant="body1" sx={{ span: { color: "grey.600" } }}>
          <span>Order ID:</span> {id}
        </Typography>

        <Typography variant="body1" sx={{ span: { color: "grey.600" } }}>
          <span>Dibuat:</span> {format(new Date(createdAt), "dd MMM, yyyy")}
        </Typography>
      </FlexBox>

      <FlexBox gap={3} my={3} flexDirection={{ sm: "row", xs: "column" }}>
        <TextField
          select
          fullWidth
          color="info"
          size="medium"
          value={currentStatus}
          label="Status pesanan"
          disabled={saving}
          onChange={(e) => void handleStatusChange(e.target.value)}
          slotProps={{
            select: {
              IconComponent: () => <KeyboardArrowDown sx={{ color: "grey.600", mr: 1 }} />
            }
          }}>
          {ORDER_STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </FlexBox>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
