import { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { fetchPayoutSettings, savePayoutSettings } from "../settings-api";

export default function CashPayment() {
  const [amount, setAmount] = useState("0");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayoutSettings()
      .then((s) => setAmount(String(s?.cash?.amount ?? "0")))
      .catch(() => setError("Gagal memuat cash payout setting."));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await savePayoutSettings("cash", { amount });
      setSuccess("Cash payout setting tersimpan.");
    } catch {
      setError("Gagal menyimpan cash payout setting.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Fragment>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Cash Payment
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField
        fullWidth
        color="info"
        size="medium"
        name="amount"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button color="info" variant="contained" onClick={handleSave} disabled={saving}>
        Save Changes
      </Button>
    </Fragment>
  );
}
