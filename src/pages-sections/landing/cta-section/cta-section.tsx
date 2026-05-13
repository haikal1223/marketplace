"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Speed from "@mui/icons-material/Speed";
import Rocket from "@mui/icons-material/Rocket";
import LocalOffer from "@mui/icons-material/LocalOffer";

import { StatsGrid, StyledRoot, OfferBadge, CTAContainer, PrimaryButton } from "./styles";

export default function CTASection() {
  return (
    <StyledRoot>
      <Container maxWidth="lg">
        <CTAContainer>
          {/* Limited Time Offer Badge */}
          {/* <OfferBadge>
            <LocalOffer fontSize="small" />
            <Typography variant="body2" fontWeight={600}>
              Limited Time: Save 40% on Pro License
            </Typography>
          </OfferBadge> */}

          {/* Main CTA Content */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" fontSize={{ xs: 32, md: 42 }} sx={{ mb: 1, fontWeight: 900 }}>
              Ready to Build Your Dream Store?
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 600,
                lineHeight: 1.6,
                marginInline: "auto"
              }}>
              Join thousands of developers and store owners who chose Bazaar to create stunning, high-performing
              e-commerce experiences that convert visitors into customers.
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" mb={4}>
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                label="Develop Fast"
                icon={<Speed />}
              />

              <Chip
                size="small"
                color="secondary"
                variant="outlined"
                label="Ship Faster"
                icon={<Rocket />}
              />
            </Stack>
          </Box>

          <PrimaryButton size="large" sx={{ px: 5, py: 2, fontSize: "1.2rem" }}>
            🚀 Get Bazaar Now
          </PrimaryButton>

          {/* Stats Grid */}
          <StatsGrid>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700} color="primary.main">
                75+
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Demo Pages
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700} color="primary.main">
                100%
              </Typography>

              <Typography variant="body1" color="text.secondary">
                TypeScript
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700} color="primary.main">
                4.5 ★
              </Typography>

              <Typography variant="body1" color="text.secondary">
                User Rating
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700} color="primary.main">
                24/7
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Support
              </Typography>
            </Box>
          </StatsGrid>

          {/* Guarantee */}
          <Box
            mt={4}
            display="flex"
            gap={{ xs: 2, sm: 4 }}
            justifyContent={{ xs: "start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}>
            <Typography variant="body2" color="text.secondary">
              💰 Unbeatable value for your purchase
            </Typography>

            <Typography variant="body2" color="text.secondary">
              🔒 Secure payment
            </Typography>

            <Typography variant="body2" color="text.secondary">
              ⚡ Instant download
            </Typography>
          </Box>
        </CTAContainer>
      </Container>
    </StyledRoot>
  );
}
