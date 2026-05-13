import Typography from "@mui/material/Typography";

export default function ProductDescription() {
  return (
    <div>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Specification:
      </Typography>

      <div>
        Brand: Beats <br />
        Model: S450 <br />
        Wireless Bluetooth Headset <br />
        FM Frequency Response: 87.5 – 108 MHz <br />
        Feature: FM Radio, Card Supported (Micro SD / TF) <br />
        Made in China <br />
      </div>
    </div>
  );
}
