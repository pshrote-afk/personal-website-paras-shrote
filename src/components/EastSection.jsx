import { styles } from "../styles/styles";

/**
 * EastSection
 * The panel that slides in from the east when the Triathlete button is toggled.
 *
 * Props:
 *  visible - boolean
 */
export default function EastSection({ visible }) {
  const containerStyle = {
    ...styles.eastBase,
    ...(visible ? styles.eastShow : {}),
  };

  return (
    <div style={containerStyle} aria-hidden={!visible}>
      <h6 style={{ fontFamily: "'Space Mono', monospace" }}>Testing EAST</h6>
    </div>
  );
}
