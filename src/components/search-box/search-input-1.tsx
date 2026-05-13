"use client";

import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// CUSTOM ICON COMPONENT
import Search from "icons/Search";
// CUSTOM DATA MODEL
import { CategoryLink } from "models/Layout.model";

const INPUT_PROPS = {
  sx: {
    border: 0,
    padding: 0,
    borderRadius: 1,
    borderColor: "transparent",
    overflow: "hidden",
    backgroundColor: "grey.50",
    "& .MuiOutlinedInput-notchedOutline": {
      border: 1,
      borderRadius: 1,
      borderColor: "transparent"
    }
  },
  endAdornment: (
    <Box
      ml={2}
      px={2}
      display="grid"
      alignItems="center"
      justifyContent="center"
      borderLeft="1px solid"
      borderColor="grey.200">
      <Search sx={{ fontSize: 17, color: "grey.400" }} />
    </Box>
  )
};

// ==============================================================
interface Props {
  categories: CategoryLink[];
}
// ==============================================================

export function SearchInput1({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(() => {
    const term = search.trim();
    if (!term) return;
    const params = new URLSearchParams(searchParams);
    params.set("q", term);
    params.delete("category");
    params.delete("page");
    router.push(`/products/search?${params.toString()}`);
  }, [search, router, searchParams]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  if (!categories || !categories.length) return null;

  return (
    <TextField
      fullWidth
      value={search}
      variant="outlined"
      onKeyDown={handleEnter}
      onChange={handleChange}
      placeholder="Searching for..."
      slotProps={{ input: INPUT_PROPS }}
      aria-label="Search products"
      role="searchbox"
    />
  );
}
