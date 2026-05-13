import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Card5Wrapper } from "./styles";

export default function Card5() {
  return (
    <Card5Wrapper>
      <div>
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          #EXPLORE
        </Typography>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.2,
            fontSize: { xl: 36, lg: 30, xs: 28 }
          }}>
          COUPONS
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 4,
            fontWeight: 500,
            fontSize: { sm: 18, xs: 16 }
          }}>
          #LATEST_COLLECTION2022
        </Typography>
      </div>
    </Card5Wrapper>
  );
}
