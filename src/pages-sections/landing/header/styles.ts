import { styled, keyframes, alpha } from "@mui/material/styles";

const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

// STYLED COMPONENT
export const HeaderWrapper = styled("div")(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  background: `linear-gradient(135deg, 
  ${alpha(theme.palette.primary.main, 0.02)} 0%, 
  ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(ellipse at top, 
      ${alpha(theme.palette.primary.main, 0.05)} 0%, 
      transparent 50%)`,
    pointerEvents: "none"
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -50,
    right: -50,
    width: 200,
    height: 200,
    background: `linear-gradient(45deg, 
      ${alpha(theme.palette.primary.main, 0.1)}, 
      ${alpha(theme.palette.secondary.main, 0.1)})`,
    borderRadius: "50%",
    filter: "blur(60px)",
  },
  "& .link": {
    fontWeight: 500,
    cursor: "pointer",
    padding: "0.25rem 1.25rem",
    color: theme.palette.grey[600],
    transition: "color 250ms ease-in-out",
    "&:hover": { color: theme.palette.primary.main }
  },

  "& .fixedHeader": {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    position: "fixed",
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    animation: `${slideFromTop} 250ms ease-in-out`,
    "& .link": { color: "inherit" }
  },

  [theme.breakpoints.down("sm")]: {
    "& .right-links": { display: "none" },
    "& .purchase-link": { display: "none" }
  }
}));
