"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import NavItem from "./nav-item";
// STYLED COMPONENTS
import { MainContainer } from "./styles";

export type DashboardCountKey = "orders" | "wishlist" | "tickets" | "addresses" | "paymentMethods";

export type DashboardCounts = Record<DashboardCountKey, number>;

type MenuLink =
  | { icon: string; href: string; title: string }
  | { icon: string; href: string; title: string; countKey: DashboardCountKey };

const MENU_DEFINITION: { title: string; list: MenuLink[] }[] = [
  {
    title: "DASHBOARD",
    list: [
      { countKey: "orders", icon: "Packages", href: "/orders", title: "Orders" },
      { countKey: "wishlist", icon: "HeartLine", href: "/wish-list", title: "Wishlist" },
      { countKey: "tickets", icon: "Headset", href: "/support-tickets", title: "Support Tickets" }
    ]
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      { icon: "User3", href: "/profile", title: "Profile Info" },
      { countKey: "addresses", icon: "Location", href: "/address", title: "Addresses" },
      { countKey: "paymentMethods", icon: "CreditCard", href: "/payment-methods", title: "Payment Methods" }
    ]
  }
];

export function Navigation() {
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/users/dashboard-counts")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<DashboardCounts>;
      })
      .then((data) => {
        if (!cancelled) setCounts(data);
      })
      .catch(() => {
        if (!cancelled) {
          setCounts({
            orders: 0,
            wishlist: 0,
            tickets: 0,
            addresses: 0,
            paymentMethods: 0
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <MainContainer>
      {MENU_DEFINITION.map((section) => (
        <Box mt={2} key={section.title}>
          <Typography
            fontSize={12}
            variant="body1"
            fontWeight={500}
            color="text.secondary"
            textTransform="uppercase"
            sx={{ padding: ".75rem 1.75rem" }}>
            {section.title}
          </Typography>

          {section.list.map((listItem) => {
            const count =
              "countKey" in listItem && listItem.countKey && counts !== null
                ? counts[listItem.countKey]
                : undefined;

            return (
              <NavItem
                key={listItem.title}
                item={{ icon: listItem.icon, href: listItem.href, title: listItem.title, count }}
              />
            );
          })}
        </Box>
      ))}

      <Box px={4} mt={6} pb={2}>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          fullWidth
          disabled={loggingOut}
          onClick={handleLogout}>
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </Box>
    </MainContainer>
  );
}
