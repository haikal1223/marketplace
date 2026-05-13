import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
import Call from "@mui/icons-material/Call";
import Place from "@mui/icons-material/Place";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM ICON COMPONENTS
import TwitterFilled from "icons/TwitterFilled";
import YoutubeFilled from "icons/YoutubeFilled";
import FacebookFilled from "icons/FacebookFilled";
import InstagramFilled from "icons/InstagramFilled";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";

// =======================================================
type Props = { shop: Shop };
// =======================================================

export default function ShopIntroCard({ shop }: Props) {
  const { name, phone, address, email, coverPicture, profilePicture, socialLinks } = shop;

  const socials = [
    { Icon: FacebookFilled, url: socialLinks.facebook },
    { Icon: TwitterFilled, url: socialLinks.twitter },
    { Icon: YoutubeFilled, url: socialLinks.youtube },
    { Icon: InstagramFilled, url: socialLinks.instagram }
  ];

  return (
    <Card sx={{ mb: 4, pb: 2.5 }}>
      <Box height="202px" sx={{ background: `url(${coverPicture}) center/cover` }} />

      <FlexBox mt={-8} px={3.75} flexWrap="wrap">
        <Avatar
          alt={name}
          src={profilePicture}
          variant="rounded"
          sx={{
            mr: "37px",
            width: "120px",
            height: "120px",
            border: "2px solid",
            borderColor: "grey.100"
          }}
        />

        <Box
          sx={{
            flex: "1 1 0",
            minWidth: "250px",
            "@media only screen and (max-width: 500px)": { marginLeft: 0 }
          }}>
          <FlexBetween flexWrap="wrap" mt={0.375} mb={3}>
            <Box
              my={1}
              p="4px 16px"
              borderRadius="4px"
              display="inline-block"
              bgcolor="secondary.main">
              <Typography variant="h3" sx={{ color: "grey.100" }}>
                {name}
              </Typography>
            </Box>

            <FlexBox my={1} gap={1.5} flexWrap="wrap" alignItems="center">
              {(shop.customLinks ?? []).map((link, index) => (
                <Button
                  key={`custom-${link.url}-${index}`}
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="small"
                  variant="text"
                  color="primary">
                  {link.label?.trim() || link.url}
                </Button>
              ))}
              {socials.map(({ Icon, url }, index) =>
                url ? (
                  <a href={url} target="_blank" rel="noreferrer noopener" key={`soc-${index}`}>
                    <Icon sx={{ fontSize: 27 }} />
                  </a>
                ) : null
              )}
            </FlexBox>
          </FlexBetween>

          <FlexBetween flexWrap="wrap">
            <div>
              <FlexBox color="grey.600" gap={1} mb={1} maxWidth={270}>
                <Place fontSize="small" sx={{ fontSize: 18, mt: "3px" }} />
                <Typography component="span" sx={{ color: "grey.600" }}>
                  {address}
                </Typography>
              </FlexBox>

              <FlexBox color="grey.600" gap={1} mb={1}>
                <Call fontSize="small" sx={{ fontSize: 18, mt: "2px" }} />
                <Typography component="span" sx={{ color: "grey.600" }}>
                  {phone}
                </Typography>
              </FlexBox>
            </div>

            {email ? (
              <a href={`mailto:${email}`}>
                <Button variant="outlined" color="primary" sx={{ my: 1.5 }}>
                  Contact Vendor
                </Button>
              </a>
            ) : (
              <Button variant="outlined" color="primary" sx={{ my: 1.5 }} disabled>
                Contact Vendor
              </Button>
            )}
          </FlexBetween>
        </Box>
      </FlexBox>
    </Card>
  );
}
