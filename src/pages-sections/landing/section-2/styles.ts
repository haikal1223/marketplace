"use client";

import Card from "@mui/material/Card";
import { alpha, styled, keyframes } from "@mui/material/styles";

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

export const Title = styled("h2")(() => ({
  fontSize: 32,
  fontWeight: 700,
  textAlign: "center"
}));

export const FeaturesSection = styled("div")(({ theme }) => ({
  position: "relative",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.grey[50], 0.8)} 0%, 
    ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
  "&::before": {
    inset: 0,
    content: '""',
    position: "absolute",
    pointerEvents: "none",
    background: `radial-gradient(ellipse at center, 
      ${alpha(theme.palette.primary.main, 0.02)} 0%, 
      transparent 70%)`
  }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  padding: theme.spacing(4),
  cursor: "pointer",
  alignItems: "flex-start",
  flexDirection: "column",
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: `${slideInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) both`,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: `linear-gradient(90deg, 
      var(--accent-color, ${theme.palette.primary.main}), 
      ${alpha(theme.palette.secondary.main, 0.7)})`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.4s ease"
  },

  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.12)}`,
    background: alpha(theme.palette.background.paper, 0.95),

    "&::before": {
      transform: "scaleX(1)"
    },

    "& .feature-icon": {
      transform: "scale(1.1) rotate(5deg)",
      animation: `${float} 2s ease-in-out infinite`
    }
  }
}));

export const FeatureIcon = styled("div")(({ theme }) => ({
  width: 64,
  height: 64,
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  transition: "all 0.4s ease",

  "&::after": {
    inset: -2,
    zIndex: -1,
    opacity: 0,
    content: '""',
    position: "absolute",
    borderRadius: "inherit",
    transition: "opacity 0.4s ease",
    background: `linear-gradient(135deg, 
      var(--accent-color, ${theme.palette.primary.main}), 
      ${alpha(theme.palette.secondary.main, 0.7)})`
  },

  "&:hover::after": { opacity: 0.2 }
}));

export const FeatureContent = styled("div")(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column"
}));
