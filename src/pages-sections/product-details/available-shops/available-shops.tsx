import Link from "next/link";
import Image from "next/image";
// MUI
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// STYLED COMPONENTS
import { StyledCard } from "./styles";
// API FUNCTIONS
import { getAvailableShops } from "utils/__api__/shop";

export default async function AvailableShops() {
  const shops = await getAvailableShops();

  // IF NO SHOPS RETURN NULL
  if (!shops || !shops.length) return null;

  return (
    <div className="mb-4">
      <Typography variant="h3" sx={{ mb: 3 }}>
        Also Available at
      </Typography>

      <Grid container spacing={4}>
        {shops.map(({ imgUrl, name, url }) => (
          <Grid size={{ lg: 2, md: 3, sm: 4, xs: 12 }} key={name}>
            <Link href={url}>
              <StyledCard>
                <Avatar className="shop-avatar" variant="rounded">
                  <Image alt={name} src={imgUrl} fill sizes="(48px 48px)" />
                </Avatar>

                <p className="shop-name">{name}</p>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
