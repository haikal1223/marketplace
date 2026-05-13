import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
// STYLED COMPONENT
import { StyledButton, StyledHeadingRoot } from "./styles";

// ==============================================================
type Props = { title: string };
// ==============================================================

export default function Heading({ title }: Props) {
  return (
    <StyledHeadingRoot>
      <h2 className="title">{title}</h2>
      <StyledButton disableFocusRipple endIcon={<ArrowRightAlt fontSize="inherit" />}>
        View All
      </StyledButton>
    </StyledHeadingRoot>
  );
}
