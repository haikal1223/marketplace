import Link from "next/link";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import ListItem from "./list-item";
// CUSTOM DATA MODELS
import Shop from "models/Shop.model";

// ======================================================
interface Props {
  shops: Shop[];
}
// ======================================================

export default function Sidebar({ shops }: Props) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 250,
        height: "100%",
        padding: "1.25rem",
        borderRadius: "10px",
        display: { xs: "none", md: "block" },
        backgroundColor: "grey.50",
        position: "sticky",
        top: 100
      }}>
      <Typography variant="h4" sx={{ cursor: "pointer", mb: 2 }}>
        Shops
      </Typography>

      {shops.map((shop) => (
        <Link href={`/shops/${shop.slug}`} key={shop.id}>
          <ListItem title={shop.name} imgUrl={shop.profilePicture} sx={{ mb: "0.75rem" }} />
        </Link>
      ))}

      <Link href="/shops">
        <ListItem
          title="View all shops"
          sx={{
            mt: 8,
            justifyContent: "center",
            backgroundColor: "white"
          }}
        />
      </Link>
    </Card>
  );
}
