import { useState, useEffect, useCallback } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";
import debounce from "lodash/debounce";

export default function useHeader() {
  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const toggleSidenav = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const scrollListener = debounce(() => {
    if (window.scrollY >= 72) setFixed(true);
    else setFixed(false);
  }, 50);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return { open, isFixed, downSM, toggleSidenav };
}
