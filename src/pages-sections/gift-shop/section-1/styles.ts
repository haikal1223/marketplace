import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
  marginTop: "2rem",
  marginBottom: 60,
  overflow: "hidden",
  "& .carousel-wrapper": {
    position: "relative",
    paddingInline: "3rem",
    backgroundColor: theme.palette.primary[50]
  }
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "auto",
  alignItems: "center",
  paddingBlock: "2rem",
  [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" }
}));

export const ContentWrapper = styled("div")(({ theme }) => ({
  paddingBlock: "8rem",
  h1: {
    fontSize: 55,
    marginTop: 10,
    lineHeight: 1.3,
    marginBottom: 30,
    [theme.breakpoints.down("lg")]: { fontSize: 45 }
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    h1: { fontSize: 25 }
  },
  [theme.breakpoints.down("md")]: {
    paddingBlock: "4rem",
    h1: { fontSize: 30 }
  }
}));

export const CarouselButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  borderRadius: 0,
  fontSize: "16px",
  padding: "8px 30px",
  background: theme.palette.primary.main,
  "&:hover": { background: theme.palette.primary[400] }
}));

export const GridItemTwo = styled(Grid)(({ theme }) => ({
  paddingInline: "3rem",
  [theme.breakpoints.down("sm")]: { display: "none" }
}));
