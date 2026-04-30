import { styles } from "../styles/styles";

/**
 * SamuraiSprite
 * Renders the pixel-art samurai character at a given position.
 *
 * Props:
 *  pos    - { x, y } position in pixels (fixed positioning)
 *  anim   - "idle" | "run" | "attack"
 *  flipX  - boolean, mirrors the sprite horizontally when moving left
 *  hidden - boolean, hides the sprite when a section panel is open
 */
export default function SamuraiSprite({ pos, anim, flipX, hidden }) {
  const scaleX = flipX ? -2.08 : 2.08;

  return (
    <div
      style={{
        ...styles.samuraiContainer,
        left: pos.x,
        top:  pos.y,
        display: hidden ? "none" : "block",
      }}
    >
      <div
        className={`s-${anim}`}
        style={{
          ...styles.samuraiSprite,
          transform: `scaleX(${scaleX}) scaleY(2.08)`,
        }}
      />
    </div>
  );
}
