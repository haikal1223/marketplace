import Button from "@mui/material/Button";
// LOCAL CUSTOM COMPONENT
import { RootStyle } from "./styles";

export default function Section7() {
  return (
    <RootStyle>
      <p className="subtitle">
        Extra <span color="primary.main">30% Off</span> Online
      </p>

      <h1 className="title">Summer Season Sale</h1>
      <p className="description">Free shipping on orders over $99</p>

      <Button variant="contained" size="large" color="dark">
        Shop Now
      </Button>
    </RootStyle>
  );
}
