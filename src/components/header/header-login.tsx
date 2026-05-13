"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SvgIcon from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import { useState } from "react";

const PersonIcon = () => (
  <SvgIcon fontSize="small">
    <svg viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="9" r="3" />
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" />
      </g>
    </svg>
  </SvgIcon>
);

export function HeaderLogin() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (status === "loading") {
    return (
      <IconButton disabled>
        <PersonIcon />
      </IconButton>
    );
  }

  if (!session) {
    return (
      <IconButton LinkComponent={Link} href="/login">
        <PersonIcon />
      </IconButton>
    );
  }

  const role = (session.user as any).role;
  const dashboardUrl =
    role === "ADMIN" ? "/admin/dashboard" : role === "VENDOR" ? "/vendor/dashboard" : "/profile";
  const initial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
        {session.user?.image ? (
          <Avatar src={session.user.image} sx={{ width: 32, height: 32 }} />
        ) : (
          <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: "primary.main" }}>
            {initial}
          </Avatar>
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 180 } } }}>
        <MenuItem disabled>
          <Typography variant="body2" color="text.secondary" noWrap>
            {session.user?.name}
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem component={Link} href={dashboardUrl} onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {role === "ADMIN" ? "Admin Panel" : role === "VENDOR" ? "Vendor Dashboard" : "My Profile"}
        </MenuItem>

        {role === "CUSTOMER" && (
          <>
            <MenuItem component={Link} href="/orders" onClick={() => setAnchorEl(null)}>
              <ListItemIcon>
                <SvgIcon fontSize="small">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </SvgIcon>
              </ListItemIcon>
              My Orders
            </MenuItem>

            <MenuItem component={Link} href="/become-vendor" onClick={() => setAnchorEl(null)}>
              <ListItemIcon>
                <StorefrontOutlined fontSize="small" />
              </ListItemIcon>
              Become a vendor
            </MenuItem>
          </>
        )}

        <Divider />

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut({ callbackUrl: "/" });
          }}
          sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <SvgIcon fontSize="small">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </SvgIcon>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
