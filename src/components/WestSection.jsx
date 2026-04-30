import { styles } from "../styles/styles";

/**
 * WestSection
 * The panel that slides in from the west when the Developer button is toggled.
 *
 * Props:
 *  visible - boolean
 */
export default function WestSection({ visible }) {
  const containerStyle = {
    ...styles.westBase,
    ...(visible ? styles.westShow : {}),
  };

  return (
    <div style={containerStyle} aria-hidden={!visible}>
      <h6 style={{ fontFamily: "'Space Mono', monospace" }}>Testing WEST</h6>
    </div>
  );
}
