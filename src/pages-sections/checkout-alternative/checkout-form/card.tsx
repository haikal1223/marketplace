import type { PropsWithChildren } from "react";
import MuiCard from "@mui/material/Card";

export default function Card({ children }: PropsWithChildren) {
  return (
    <MuiCard
      elevation={0}
      sx={{
        padding: 3,
        marginBottom: 3,
        border: "1px solid",
        borderColor: "grey.100"
      }}>
      {children}
    </MuiCard>
  );
}
