import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

interface Props {
  userName?: string;
  todayVisit?: number;
  todaySales?: number;
}

export default function WelcomeCard({ userName, todayVisit, todaySales }: Props) {
  const safeName = userName || "User";
  const safeVisit = Number.isFinite(Number(todayVisit)) ? Number(todayVisit) : 0;
  const safeSales = Number.isFinite(Number(todaySales)) ? Number(todaySales) : 0;

  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        "& p": { color: "text.secondary" }
      }}>
      <Typography variant="h5" color="info" sx={{ mb: 0.5 }}>
        Good Morning, {safeName}!
      </Typography>

      <p>Here’s what happening with your store today!</p>

      <Typography variant="h3" sx={{ mt: 3 }}>
        {safeVisit.toLocaleString("en-US")}
      </Typography>
      <p>Today’s Visit</p>

      <Typography variant="h3" sx={{ mt: 1.5 }}>
        {currency(safeSales)}
      </Typography>
      <p>Today’s total sales</p>

      <Box
        sx={{
          right: 24,
          bottom: 0,
          position: "absolute",
          display: { xs: "none", sm: "block" }
        }}>
        <Image
          width={195}
          height={171}
          alt="Welcome"
          src="/assets/images/illustrations/dashboard/welcome.svg"
        />
      </Box>
    </Card>
  );
}
