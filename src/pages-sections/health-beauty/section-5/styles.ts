import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
  gap: "1rem",
  display: "flex",
  borderRadius: 12,
  padding: "1.5rem",
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "1rem 0.5rem",
    textAlign: "center"
  },
  "& .title": { fontSize: 16, marginBottom: "4px" },
  "& .description": { color: theme.palette.text.secondary }
}));

export const IconBox = styled("div")(({ theme }) => ({
  padding: "15px",
  display: "flex",
  fontSize: "25px",
  borderRadius: 12,
  alignItems: "center",
  background: theme.palette.primary[50]
}));
