import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// ==============================================================
type Props = {
  address: string;
  /** Optional note — wire when Order model stores customer notes */
  customerNote?: string;
};
// ==============================================================

export default function ShippingAddress({ address, customerNote = "" }: Props) {
  return (
    <Card sx={{ px: 3, py: 4 }}>
      <TextField
        rows={5}
        multiline
        fullWidth
        color="info"
        variant="outlined"
        label="Alamat pengiriman"
        value={address}
        InputProps={{ readOnly: true }}
        sx={{ mb: 4 }}
      />

      <TextField
        rows={4}
        multiline
        fullWidth
        color="info"
        variant="outlined"
        label="Catatan pembeli"
        value={customerNote}
        placeholder="Belum ada catatan."
        InputProps={{ readOnly: true }}
      />
    </Card>
  );
}
