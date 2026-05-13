import Container from "components/Container";
import IconComponent from "components/IconComponent";
// STYLED COMPONENTS
import { StyledRoot, ServiceItem } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-2";

export default async function Section2() {
  const services = await api.getServices();
  if (!services || !services.length) return null;

  return (
    <Container>
      <StyledRoot>
        {services.map((item, ind) => (
          <ServiceItem key={ind}>
            <IconComponent icon={item.icon} sx={{ fontSize: 40 }} />

            <div>
              <h4 className="title">{item.title}</h4>
              <p className="description">{item.description}</p>
            </div>
          </ServiceItem>
        ))}
      </StyledRoot>
    </Container>
  );
}
