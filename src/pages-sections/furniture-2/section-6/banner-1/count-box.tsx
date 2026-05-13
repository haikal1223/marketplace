// STYLED COMPONENT
import { CountBoxWrapper } from "./styles";

// ==============================================================
type Props = { label: string; value: number };
// ==============================================================

export default function CountBox({ label, value }: Props) {
  return (
    <CountBoxWrapper>
      <div className="count-box">
        <span>{value}</span>
      </div>

      <span className="label">{label}</span>
    </CountBoxWrapper>
  );
}
