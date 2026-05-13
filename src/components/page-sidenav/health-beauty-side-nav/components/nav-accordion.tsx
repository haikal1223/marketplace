"use client";

import { useParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
// GLOBAL CUSTOM COMPONENTS
import AccordionHeader from "components/accordion";
// LOCAL CUSTOM COMPONENT
import ListItem from "./list-item";
import { renderChild } from "./render-child";
// CUSTOM DATA MODEL
import { CategoryNavItem } from "models/CategoryNavList.model";

// ==============================================================
type Props = { item: CategoryNavItem };
// ==============================================================

export default function NavAccordion({ item }: Props) {
  const { category } = useParams();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const handleCollapse = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  useEffect(() => {
    const matchedItem = item.child!.find((childItem) =>
      childItem.href.endsWith(category as string)
    );
    if (matchedItem) {
      setOpen(true);
      setActive(matchedItem.title);
    }
  }, [category, item.child]);

  return (
    <Fragment>
      <AccordionHeader
        open={open}
        onClick={handleCollapse}
        sx={{
          padding: 0,
          cursor: "pointer",
          transition: "all 150ms ease-in-out",
          ":hover": { color: "primary.main" }
        }}>
        <ListItem item={item} />
      </AccordionHeader>

      {item.child ? <Collapse in={open}>{renderChild(item.child, active)}</Collapse> : null}
    </Fragment>
  );
}
