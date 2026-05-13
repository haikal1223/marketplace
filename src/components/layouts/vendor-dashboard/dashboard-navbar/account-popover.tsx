import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
// MUI
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// STYLED COMPONENT
const Divider = styled("div")(({ theme }) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`
}));

export default function AccountPopover() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const role = (session?.user as { role?: string } | undefined)?.role;
  const displayName = session?.user?.name ?? "Account";
  const roleLabel =
    role === "ADMIN" ? "Admin" : role === "VENDOR" ? "Vendor" : role === "CUSTOMER" ? "Customer" : "User";

  return (
    <div>
      <IconButton
        sx={{ padding: 0 }}
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "account-menu" : undefined}>
        <Avatar
          alt={displayName}
          src={session?.user?.image ?? "/assets/images/avatars/001-man.svg"}
        />
      </IconButton>

      <Menu
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              boxShadow: 2,
              minWidth: 200,
              borderRadius: "8px",
              overflow: "visible",
              border: "1px solid",
              borderColor: "grey.200",
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "grey.200"
              },
              "&:before": {
                top: 0,
                right: 14,
                zIndex: 0,
                width: 10,
                height: 10,
                content: '""',
                display: "block",
                position: "absolute",
                borderTop: "1px solid",
                borderLeft: "1px solid",
                borderColor: "grey.200",
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)"
              }
            }
          }
        }}>
        <Box px={2} pt={1}>
          <Typography variant="h6">{displayName}</Typography>
          <Typography variant="body1" sx={{ fontSize: 12, color: "grey.500" }}>
            {roleLabel}
          </Typography>
        </Box>

        <Divider />
        <MenuItem
          component={Link}
          href={role === "VENDOR" ? "/vendor/account-settings" : role === "ADMIN" ? "/admin/dashboard" : "/profile"}>
          Profile
        </MenuItem>
        <MenuItem
          component={Link}
          href={role === "VENDOR" || role === "ADMIN" ? "/vendor/orders" : "/orders"}>
          My Orders
        </MenuItem>
        <MenuItem
          component={Link}
          href={role === "VENDOR" ? "/vendor/shop-settings" : role === "ADMIN" ? "/admin/dashboard" : "/profile"}>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            void signOut({ callbackUrl: "/" });
          }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
