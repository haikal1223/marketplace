"use client";

import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { alpha, styled, keyframes } from "@mui/material/styles";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
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
    transform: translateY(-5px);
  }
`;

export const TestimonialsSection = styled("div")(({ theme }) => ({
  position: "relative",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.grey[50], 0.8)} 0%, 
    ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
  "&::before": {
    inset: 0,
    content: '""',
    position: "absolute",
    pointerEvents: "none",
    background: `radial-gradient(ellipse at center, 
      ${alpha(theme.palette.primary.main, 0.03)} 0%, 
      transparent 70%)`
  }
}));

export const TestimonialCard = styled(Card)(({ theme }) => ({
  // height: "100%",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  animation: `${slideIn} 0.6s ease-out`,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
    "& .quote-icon": {
      transform: "scale(1.1) rotate(5deg)",
      color: theme.palette.primary.main
    }
  }
}));

export const QuoteIcon = styled("div")(({ theme }) => ({
  position: "absolute",
  top: -10,
  right: 20,
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  transition: "all 0.3s ease",
  animation: `${float} 3s ease-in-out infinite`,
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    className: "quote-icon"
  }
}));

export const NavigationButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20
  }
}));
