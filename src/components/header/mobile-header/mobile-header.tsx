import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

// ==============================================================
interface MobileHeaderProps extends ComponentProps<typeof Box> {}
// ==============================================================

export function MobileHeader({ children, ...props }: MobileHeaderProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" {...props}>
      {children}
    </Box>
  );
}

// ==================================================================
interface MobileHeaderLeftProps extends ComponentProps<typeof Box> {}
// ==================================================================

MobileHeader.Left = function ({ children, ...props }: MobileHeaderLeftProps) {
  return (
    <Box flex={1} {...props}>
      {children}
    </Box>
  );
};

MobileHeader.Logo = function ({ logoUrl }: { logoUrl: string }) {
  return (
    <Link href="/">
      <Image width={60} height={44} src={logoUrl} alt="logo" />
    </Link>
  );
};

// ==================================================================
interface MobileHeaderRightProps extends ComponentProps<typeof Box> {}
// ==================================================================

MobileHeader.Right = function ({ children, ...props }: MobileHeaderRightProps) {
  return (
    <Box display="flex" justifyContent="end" flex={1} {...props}>
      {children}
    </Box>
  );
};
