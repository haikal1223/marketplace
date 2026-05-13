"use client";

import { alpha, styled, keyframes } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
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

export const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: { flexDirection: "column" },
  "& span": {
    // fontStyle: "italic",
    color: theme.palette.primary.main,
    textDecoration: "underline",
    textUnderlineOffset: "0.25rem"
  }
}));

export const ImageGroup = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: { display: "none" }
}));

export const ImageWrapper = styled("div")(({ theme }) => ({
  width: 430,
  opacity: 0.8,
  display: "flex",
  borderRadius: 12,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  transition: "z-index 0.5s, scale 0.5s, box-shadow 0.5s, border-color 0.5s",
  ":hover": {
    zIndex: 2,
    opacity: 1,
    scale: 1.1
  },
  img: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    aspectRatio: "20 / 11"
  },
  ".content": {
    left: 0,
    bottom: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "1rem",
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    transition: "opacity 0.5s",
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.grey[200], 0.5),
    "&:hover": { opacity: 1 },
    ".link": {
      fontSize: 12,
      marginTop: "0.5rem",
      // color: theme.palette.info.main,
      textDecoration: "underline",
      textUnderlineOffset: "0.25rem"
    }
  }
}));

export const HeroSection = styled("div")(({ theme }) => ({
  position: "relative",
  minHeight: "80vh",
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.02)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  overflow: "hidden",
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
    animation: `${float} 6s ease-in-out infinite`
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "60vh",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.text.primary} 0%, 
    ${theme.palette.primary.main} 50%, 
    ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: `${fadeInUp} 0.8s ease-out`,
  "& span": {
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    position: "relative",
    fontWeight: 900,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      height: 3,
      bottom: -1,
      borderRadius: 2,
      background: `linear-gradient(90deg, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.main})`
    }
  }
}));

export const TrustIndicators = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "1.5rem",
  animation: `${fadeInUp} 0.6s ease-out`,
  "& .MuiChip-root": {
    animation: `${pulse} 2s infinite`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[4]
    }
  }
}));

export const PulseButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  animation: `${pulse} 2s infinite`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
    "&::before": {
      transform: "translateX(100%)"
    }
  },
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
    transition: "transform 0.6s",
    transform: "translateX(-100%)"
  }
}));

export const StatsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  marginTop: theme.spacing(4),
  gap: theme.spacing(1),
  animation: `${fadeInUp} 1s ease-out 0.2s both`,
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(2)
  }
}));
