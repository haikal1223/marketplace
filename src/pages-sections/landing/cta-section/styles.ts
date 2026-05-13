"use client";

import Button from "@mui/material/Button";
import { alpha, styled, keyframes } from "@mui/material/styles";

// Animations
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const StyledRoot = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.03)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.03)} 50%,
    ${alpha(theme.palette.primary.main, 0.02)} 100%)`,

  "&::before": {
    content: '""',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: "50%",
    position: "absolute",
    background: `radial-gradient(circle, 
      ${alpha(theme.palette.primary.main, 0.1)} 0%, 
      transparent 70%)`,
    animation: `${float} 8s ease-in-out infinite`
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -50,
    right: -50,
    width: 150,
    height: 150,
    background: `radial-gradient(circle, 
      ${alpha(theme.palette.secondary.main, 0.1)} 0%, 
      transparent 70%)`,
    borderRadius: "50%",
    animation: `${float} 6s ease-in-out infinite reverse`
  }
}));

export const CTAContainer = styled("div")(() => ({
  zIndex: 1,
  textAlign: "center",
  position: "relative",
  animation: `${fadeInScale} 0.8s ease-out`
}));

export const OfferBadge = styled("div")(({ theme }) => ({
  gap: 8,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  width: "max-content",
  marginInline: "auto",
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(4),
  color: theme.palette.error.main,
  backgroundColor: alpha(theme.palette.error.main, 0.1),
  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 700,
  overflow: "hidden",
  position: "relative",
  textTransform: "none",
  borderRadius: theme.spacing(2),
  color: theme.palette.common.white,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, 
      transparent, 
      ${alpha(theme.palette.common.white, 0.2)}, 
      transparent)`,
    transition: "left 0.6s"
  },

  "&:hover": {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
    "&::before": { left: "100%" }
  },

  "&:active": { transform: "translateY(-2px) scale(0.98)" }
}));

export const StatsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  borderRadius: theme.spacing(3),
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  background: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: "blur(20px)",

  "& > *": {
    transition: "transform 0.3s ease",
    "&:hover": { transform: "translateY(-4px)" }
  },

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(3),
    gridTemplateColumns: "repeat(2, 1fr)"
  }
}));
