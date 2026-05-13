import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import IconComponent from "components/IconComponent";
// STYLED COMPONENT
import { ServiceCard } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/grocery-2";

export default async function Section2() {
  const services = await api.getServices();
  if (!services || !services.length) return null;

  return (
    <div className="mb-3">
      <Grid container spacing={3}>
        {services.map(({ icon, id, title, description }) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={id}>
            <ServiceCard>
              <IconComponent icon={icon} sx={{ fontSize: 50, color: "grey.600" }} />

              <div>
                <h4 className="title">{title}</h4>
                <span className="description">{description}</span>
              </div>
            </ServiceCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
