import Link from "next/link";
import Image from "next/image";
// MUI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Call from "@mui/icons-material/Call";
import East from "@mui/icons-material/East";
import Place from "@mui/icons-material/Place";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// STYLED COMPONENT
import { ContentWrapper, StyledAvatar, StyledIconButton } from "./styles";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";

export default function ShopCard(props: Partial<Shop>) {
  const { name, address, phone, coverPicture, profilePicture, slug } = props;

  return (
    <Card>
      <ContentWrapper img={coverPicture || "/assets/images/banners/cycle.png"}>
        <Link href={`/shops/${slug}`}>
          <Typography variant="h3" sx={{ fontWeight: 500, mb: 1.5 }}>
            {name}
          </Typography>
        </Link>

        <FlexBox mb={1} gap={1}>
          <Place fontSize="small" sx={{ fontSize: 17, mt: "3px" }} />
          <Typography component="span" sx={{ color: "white" }}>
            {address}
          </Typography>
        </FlexBox>

        <FlexBox alignItems="center" gap={1}>
          <Call fontSize="small" sx={{ fontSize: 17 }} />
          <Typography component="span" sx={{ color: "white" }}>
            {phone}
          </Typography>
        </FlexBox>
      </ContentWrapper>

      <FlexBetween pl={3} pr={1}>
        <Link href={`/shops/${slug}`} passHref>
          <StyledAvatar variant="rounded">
            <Image fill alt={name!} src={profilePicture!} sizes="(75px, 75px)" />
          </StyledAvatar>
        </Link>

        <Link href={`/shops/${slug}`} passHref>
          <StyledIconButton>
            <East className="icon" />
          </StyledIconButton>
        </Link>
      </FlexBetween>
    </Card>
  );
}
