import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckCircle from "@mui/icons-material/CheckCircle";

import { Title, StyledCard, FeatureIcon, FeatureContent, FeaturesSection } from "./styles";

// LIST DATA
const FEATURES_LIST = [
  {
    icon: "verify",
    title: "SEO Optimized",
    description:
      "Built-in SEO best practices with meta tags, structured data, and performance optimization",
    color: "#4CAF50"
  },
  {
    icon: "cloud-data",
    title: "REST API Ready",
    description: "Complete API endpoints with TypeScript models for seamless backend integration",
    color: "#2196F3"
  },
  {
    icon: "multivendor",
    title: "Multi-Vendor Platform",
    description: "Complete vendor management system with individual dashboards and analytics",
    color: "#FF9800"
  },
  {
    icon: "optimization",
    title: "Mobile-First Design",
    description: "Responsive layouts that look perfect on all devices and screen sizes",
    color: "#9C27B0"
  },
  {
    icon: "code",
    title: "Clean Architecture",
    description: "Well-organized, maintainable code following React and Next.js best practices",
    color: "#00BCD4"
  },
  {
    icon: "lighting",
    title: "Lightning Fast",
    description: "Optimized bundle size, lazy loading, and caching for maximum performance",
    color: "#FFEB3B"
  },
  {
    icon: "admin-dashboard",
    title: "Admin Dashboard",
    description: "Comprehensive admin panel with analytics, user management, and reporting",
    color: "#F44336"
  },
  {
    icon: "figma",
    title: "Design System",
    description: "Complete Figma design files with components and style guides included",
    color: "#673AB7"
  }
];

export default function Section2() {
  return (
    <FeaturesSection id="features">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Title>Everything You Need to Build Amazing Stores</Title>
          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto" mt={2}>
            Bazaar comes packed with powerful features and tools to help you create professional
            e-commerce experiences that drive sales and growth.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {FEATURES_LIST.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.title}>
              <StyledCard
                elevation={0}
                sx={{
                  "--accent-color": item.color,
                  animationDelay: `${index * 0.1}s`
                }}>
                <FeatureIcon sx={{ bgcolor: `${item.color}20` }}>
                  <Image
                    priority
                    width={32}
                    height={32}
                    alt={`${item.title} icon`}
                    src={`/assets/images/icons/${item.icon}.svg`}
                  />
                </FeatureIcon>

                <FeatureContent>
                  <Typography variant="h6" fontWeight={600} mb={1} color="text.primary">
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                    {item.description}
                  </Typography>
                </FeatureContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Additional Benefits Section */}
        <Box
          sx={{
            p: 4,
            mt: 8,
            borderRadius: 3,
            border: "1px solid rgba(25, 118, 210, 0.1)",
            background:
              "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)"
          }}>
          {/* <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
            Why Choose Bazaar?
          </Typography> */}

          <Grid container spacing={3}>
            {[
              "75+ Pre-built Pages",
              "100% TypeScript",
              "Advanced Admin Dashboard",
              "Multi-vendor Support",
              "Mobile-First Design",
              "SEO Optimized"
            ].map((benefit) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={benefit}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body1" fontWeight={500}>
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </FeaturesSection>
  );
}
