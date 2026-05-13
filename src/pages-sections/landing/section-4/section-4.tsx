import Image from "next/image";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { StyledContent } from "./styles";

import mui from "../../../../public/assets/images/landing/mui.svg";
import react from "../../../../public/assets/images/landing/react.svg";
import nextjs from "../../../../public/assets/images/landing/nextjs.svg";
import typescript from "../../../../public/assets/images/landing/typescript.svg";

const styles = {
  container: {
    my: {
      sm: 16,
      xs: 10
    }
  },
  typography: {
    mb: 6,
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center"
  }
};

const TECHNOLOGIES = [
  {
    imgUrl: react,
    title: "React",
    description: "UI Library",
    url: "https://reactjs.org/"
  },
  {
    imgUrl: nextjs,
    title: "Next.js",
    description: "React Framework",
    url: "https://nextjs.org/"
  },
  {
    imgUrl: typescript,
    title: "TypeScript",
    description: "Type Safety",
    url: "https://www.typescriptlang.org/"
  },
  {
    imgUrl: mui,
    title: "MUI",
    description: "Component Library",
    url: "https://mui.com/"
  }
];

export default function Section4() {
  return (
    <Container maxWidth="md" id="technologies" sx={styles.container}>
      <Typography variant="h3" sx={styles.typography}>
        Technologies Used
      </Typography>

      <StyledContent>
        <Grid container spacing={5}>
          {TECHNOLOGIES.map((item) => (
            <Grid size={{ lg: 3, md: 4, xs: 6 }} key={item.title}>
              <Tooltip arrow placement="top" title={`${item.title} - ${item.description}`}>
                <Card elevation={3} className="card">
                  <Image
                    priority
                    width={40}
                    height={40}
                    src={item.imgUrl}
                    alt={`${item.title} logo`}
                  />

                  <Typography variant="body1" fontSize={16} fontWeight={500} className="title">
                    {item.title}
                  </Typography>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </StyledContent>
    </Container>
  );
}
