"use client";

import { useCallback, useMemo, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import PageCard from "./page-card";
import { FilterButton, StyledRoot } from "./styles";

// CUSTOM DATA
import demos from "./data/demos";
import shops from "./data/shops";
import users from "./data/users";
import admins from "./data/admins";

const pages = [...demos, ...shops, ...admins, ...users];

const FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "homepage", label: "Homepages" },
  { value: "shop", label: "Shop" },
  { value: "user", label: "User Dashboard" },
  { value: "admin", label: "Admin Dashboard" }
] as const;

export default function Section3() {
  const [filterDemo, setFilterDemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(
    () => pages.filter((item) => (filterDemo !== "" ? item.page === filterDemo : true)),
    [filterDemo]
  );

  const handleFilterClick = useCallback((filter: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilterDemo(filter);
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <StyledRoot id="demos">
      <Container maxWidth="lg" className="container">
        <div className="header">
          <Typography variant="h1" fontSize={58} fontWeight={700} color="primary">
            75+
          </Typography>

          <Typography variant="body1" color="primary" fontSize={18}>
            Server side rendered
          </Typography>

          <Typography variant="body1" fontSize={32} fontWeight={700}>
            Demos & Pages
          </Typography>
        </div>

        <div className="filters" role="tablist" aria-label="Filter demos by category">
          {FILTER_OPTIONS.map((option) => (
            <FilterButton
              key={option.value}
              disableRipple
              role="tab"
              aria-controls="demo-grid"
              onClick={() => handleFilterClick(option.value)}
              selected={filterDemo === option.value}
              aria-selected={filterDemo === option.value}>
              {option.label}
            </FilterButton>
          ))}
        </div>

        <Grid
          container
          spacing={4}
          id="demo-grid"
          role="tabpanel"
          aria-label={`Showing ${filtered.length} demos`}>
          {filtered.map((item, i) => (
            <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={i}>
              <PageCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledRoot>
  );
}
