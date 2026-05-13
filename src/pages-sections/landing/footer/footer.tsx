import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Twitter from "@mui/icons-material/Twitter";
import Youtube from "@mui/icons-material/YouTube";
import Facebook from "@mui/icons-material/Facebook";
import Favorite from "@mui/icons-material/Favorite";
import Instagram from "@mui/icons-material/Instagram";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  icon: {
    mx: "0.5rem",
    display: "block",
    fontSize: "1.25rem",
    transition: "0.2s ease-in-out",
    "&:hover": { color: "primary.main" }
  }
};

const iconList = [
  {
    id: 1,
    Icon: Facebook,
    url: "https://www.facebook.com/UILibOfficial",
    label: "Follow us on Facebook"
  },
  {
    id: 2,
    Icon: Twitter,
    url: "https://twitter.com/uilibofficial",
    label: "Follow us on Twitter"
  },
  {
    id: 3,
    Icon: Youtube,
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
    label: "Subscribe to our YouTube channel"
  },
  {
    id: 4,
    Icon: Instagram,
    url: "https://www.instagram.com/uilibofficial/",
    label: "Follow us on Instagram"
  }
];

export default function Footer() {
  return (
    <Box component="footer" py={4} bgcolor="grey.50" role="contentinfo">
      <Container maxWidth="lg" sx={styles.container}>
        <Box display="flex" alignItems="center" fontSize={15}>
          Developed with <Favorite fontSize="small" color="primary" sx={{ mx: "0.5rem" }} /> & Care
          by &nbsp;{" "}
          <a
            href="https://ui-lib.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit UI Lib website">
            UI Lib
          </a>
        </Box>

        <Box display="flex" component="nav" aria-label="Social media links">
          {iconList.map(({ id, Icon, url, label }) => (
            <a href={url} target="_blank" rel="noreferrer noopener" key={id} aria-label={label}>
              <Icon color="inherit" sx={styles.icon} />
            </a>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
