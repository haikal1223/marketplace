import Link from "next/link";
import Image from "next/image";
// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { ContentBox, RightContent, LeftContent, StyledButton } from "./styles";
// IMPORT IMAGES
import handIcon from "../../../../public/assets/images/Health Shop/Vector (1).png";
import productImage from "../../../../public/assets/images/Health Shop/Product (4).png";

export default function Section2() {
  return (
    <Box className="mb-3" display="grid" gap={3} gridTemplateColumns={{ sm: "1fr 1fr", xs: "1fr" }}>
      <ContentBox elevation={0}>
        <RightContent>
          <Image alt="shop" width={40} height={40} src={handIcon} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Our Pharmacists are
          </Typography>
          <Typography variant="body1">here to Help People</Typography>
        </RightContent>

        <LeftContent>
          <Image
            fill
            src="/assets/images/Health Shop/Doctor.png"
            alt="doctor"
            sizes="(1000px, 1223px)"
          />
        </LeftContent>
      </ContentBox>

      <ContentBox elevation={0} sx={{ px: "20px" }}>
        <div className="content">
          <Typography variant="body1">BEAUTY PACK</Typography>
          <Typography variant="h3">CREAM BRIGHT</Typography>
          <Typography variant="h3">UP TO 25%</Typography>

          <StyledButton LinkComponent={Link} href="/shops/scarlett-beauty">
            Shop Now
          </StyledButton>
        </div>

        <div className="content">
          <LazyImage alt="shop" src={productImage} />
        </div>
      </ContentBox>
    </Box>
  );
}
