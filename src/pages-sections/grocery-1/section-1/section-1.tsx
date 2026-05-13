import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// STYLED COMPONENT
import { SectionContainer, SearchOutlinedIcon } from "./styles";

export default function Section1() {
  const SEARCH_BUTTON = (
    <Button
      color="primary"
      disableElevation
      variant="contained"
      sx={{ px: "2rem", height: "100%", borderRadius: "0 8px 8px 0" }}>
      Search
    </Button>
  );

  const STYLED = {
    height: 50,
    paddingRight: 0,
    color: "grey.700",
    background: "white",
    "& fieldset": { border: "none" }
  };

  return (
    <SectionContainer>
      <h1>Get your grocery delivery within 30 minutes</h1>

      <div className="searchBox">
        <TextField
          fullWidth
          placeholder="Searching for..."
          slotProps={{
            input: {
              sx: STYLED,
              endAdornment: SEARCH_BUTTON,
              startAdornment: <SearchOutlinedIcon fontSize="small" />
            }
          }}
        />
      </div>
    </SectionContainer>
  );
}
