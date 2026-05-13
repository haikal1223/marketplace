"use client";

import { useCallback, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Trash from "icons/Trash";

export default function DeleteAddressBtn({ id }: { id: string }) {
  const handleAddressDelete = useCallback(
    async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.stopPropagation();
      await fetch(`/api/address/user/${id}`, { method: "DELETE" });
      window.location.reload();
    },
    [id]
  );

  return (
    <IconButton onClick={handleAddressDelete}>
      <Trash fontSize="small" color="error" />
    </IconButton>
  );
}
