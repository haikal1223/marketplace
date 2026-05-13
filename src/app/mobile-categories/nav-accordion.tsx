"use client";

import { Fragment, useState } from "react";
import Collapse from "@mui/material/Collapse";
// GLOBAL CUSTOM COMPONENTS
import AccordionHeader from "components/accordion";
// LOCAL CUSTOM COMPONENTS
import renderChild from "./render-child";
// CUSTOM DATA MODEL
import { CategoryMenuItem } from "models/Category.model";

// ==============================================================
type Props = { item: CategoryMenuItem };
// ==============================================================

export default function NavAccordion({ item: { title, children } }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <AccordionHeader
        onClick={() => setOpen((state) => !state)}
        sx={{
          paddingInline: 0,
          paddingBlock: 0.5,
          cursor: "pointer",
          ".caret": { transform: open ? "rotate(90deg)" : "rotate(0deg)" },
          p: { fontWeight: 500 }
        }}>
        <p>{title}</p>
      </AccordionHeader>

      {/* RENDER NESTED ITEMS */}
      {children ? (
        <Collapse in={open}>
          <div className="child-categories">{renderChild(children)}</div>
        </Collapse>
      ) : null}
    </Fragment>
  );
}
