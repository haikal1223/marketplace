import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import IconComponent from "components/IconComponent";
// STYLED COMPONENTS
import { ContentRoot, IconBox } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/gift-shop";

export default async function Section2() {
  const services = await api.getServiceList();
  if (!services || !services.length) return null;

  return (
    <div>
      <Grid container spacing={3}>
        {services.map((item, ind) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ind}>
              <ContentRoot>
                <IconBox>
                  <IconComponent icon={item.icon} color="primary" />
                </IconBox>

                <div>
                  <h4 className="title">{item.title}</h4>
                  <p className="description">{item.description}</p>
                </div>
              </ContentRoot>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
