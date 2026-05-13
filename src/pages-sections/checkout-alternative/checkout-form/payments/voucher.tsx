import { useCallback, useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

export default function Voucher() {
  const [hasVoucher, setHasVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleVoucher = useCallback(() => {
    setHasVoucher((prev) => !prev);

    if (hasVoucher) setVoucherCode("");
  }, [hasVoucher]);

  const handleVoucherChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  }, []);

  const handleApplyVoucher = useCallback(() => {
    if (!voucherCode.trim()) return;
    setIsLoading(true);

    // TODO: Implement voucher API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [voucherCode]);

  return (
    <Box mb={3}>
      <ButtonBase
        disableRipple
        onClick={handleToggleVoucher}
        sx={{ color: "primary.main", fontWeight: 500 }}>
        I have a voucher
      </ButtonBase>

      <Collapse in={hasVoucher}>
        <FlexBox mt={2} gap={2} maxWidth={400}>
          <TextField
            fullWidth
            name="voucher"
            value={voucherCode}
            onChange={handleVoucherChange}
            placeholder="Enter voucher code here"
            aria-label="Voucher code input"
          />

          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={handleApplyVoucher}
            disabled={!voucherCode.trim() || isLoading}>
            {isLoading ? "Applying..." : "Apply"}
          </Button>
        </FlexBox>
      </Collapse>
    </Box>
  );
}
