"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Wrapper, StyledButton } from "./styles";

export default function OrderConfirmationPageView() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderIdsParam = searchParams.get("orderIds");

  const orderIds = orderIdsParam
    ? orderIdsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    : orderId
      ? [orderId]
      : [];

  const shortIds = orderIds.map((id) => id.slice(0, 8).toUpperCase());
  const primaryShortId = shortIds[0] ?? "—";
  const moreCount = Math.max(0, shortIds.length - 1);

  return (
    <Container className="mt-2 mb-5">
      <Wrapper>
        <Image
          width={116}
          height={116}
          alt="complete"
          src="/assets/images/illustrations/party-popper.svg"
        />

        <Typography variant="h1" fontWeight={700}>
          Thank you for your purchase!
        </Typography>

        <Typography
          fontSize={16}
          variant="body1"
          color="text.secondary"
          sx={{ padding: ".5rem 2rem" }}>
          Your order has been placed successfully. You can track it from your dashboard.
        </Typography>

        <Typography fontSize={16} variant="body1" color="text.secondary">
          Your order number is <strong>#{primaryShortId}</strong>
          {moreCount > 0 ? ` and ${moreCount} more` : ""}.
        </Typography>

        <StyledButton
          color="primary"
          disableElevation
          variant="contained"
          className="button-link"
          LinkComponent={Link}
          href="/orders">
          View My Orders
        </StyledButton>
      </Wrapper>
    </Container>
  );
}
