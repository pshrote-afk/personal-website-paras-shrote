import { useState, useRef } from "react";
import "./styles/animations.css";
import { styles } from "./styles/styles";
import { useSamurai } from "./hooks/useSamurai";
import NebulaButton   from "./components/NebulaButton";
import SamuraiSprite  from "./components/SamuraiSprite";
import ProfileCard    from "./components/ProfileCard";
import AuthorSection  from "./components/AuthorSection";
import EastSection    from "./components/EastSection";
import WestSection    from "./components/WestSection";

export default function App() {
  const [authorOpen, setAuthorOpen] = useState(false);
  const [eastOpen,   setEastOpen]   = useState(false);
  const [westOpen,   setWestOpen]   = useState(false);

  // DOM refs for samurai proximity detection
  const profileRef  = useRef(null);
  const northBtnRef = useRef(null);
  const eastBtnRef  = useRef(null);
  const westBtnRef  = useRef(null);

  // nebulaRefs map: updated each render so useSamurai always sees current DOM nodes
  const nebulaRefs = {
    north: { current: northBtnRef.current, onActivate: () => setAuthorOpen(v => !v) },
    east:  { current: eastBtnRef.current,  onActivate: () => setEastOpen(v => !v)   },
    west:  { current: westBtnRef.current,  onActivate: () => setWestOpen(v => !v)   },
  };
  nebulaRefs.north.current = northBtnRef.current;
  nebulaRefs.east.current  = eastBtnRef.current;
  nebulaRefs.west.current  = westBtnRef.current;

  const { pos, anim, flipX } = useSamurai(profileRef, nebulaRefs);

  // Determine which slide-out animation the main card should use
  const cardHideMode    = authorOpen ? "down" : eastOpen ? "left" : westOpen ? "right" : null;
  const anySectionOpen  = authorOpen || eastOpen || westOpen;

  return (
    <div style={styles.body}>
      {/* ── Instructions ───────────────────────────────────────── */}
      {!anySectionOpen && (
        <>
          <h6 style={styles.movementInstructions}>
            Use{" "}
            <span>
              <img
                src="/assets/img/arrow-keys.jpg"
                style={{ width: 64, height: 64, verticalAlign: "-15px" }}
                alt="arrow keys"
              />
            </span>{" "}
            keys to move.
          </h6>
          <h6 style={styles.attackInstructions}>Use K on buttons to interact.</h6>
        </>
      )}
      {/* ── Main card ──────────────────────────────────────────── */}
      <ProfileCard imageRef={profileRef} hideMode={cardHideMode} />

      {/* ── Section panels ─────────────────────────────────────── */}
      <AuthorSection visible={authorOpen} />
      <EastSection   visible={eastOpen}   />
      <WestSection   visible={westOpen}   />

      {/* ── Nebula buttons ─────────────────────────────────────── */}
      <div
        ref={northBtnRef}
        style={{ visibility: eastOpen || westOpen ? "hidden" : "visible" }}
      >
        <NebulaButton
          id="nebula-button-north"
          label="Author"
          checked={authorOpen}
          onChange={() => setAuthorOpen(v => !v)}
          position="north"
        />
      </div>

      <div
        ref={eastBtnRef}
        style={{ visibility: authorOpen || westOpen ? "hidden" : "visible" }}
      >
        <NebulaButton
          id="nebula-button-east"
          label="Triathlete"
          checked={eastOpen}
          onChange={() => setEastOpen(v => !v)}
          position="east"
        />
      </div>

      <div
        ref={westBtnRef}
        style={{ visibility: authorOpen || eastOpen ? "hidden" : "visible" }}
      >
        <NebulaButton
          id="nebula-button-west"
          label="Developer"
          checked={westOpen}
          onChange={() => setWestOpen(v => !v)}
          position="west"
        />
      </div>

      {/* ── Samurai ────────────────────────────────────────────── */}
      <SamuraiSprite
        pos={pos}
        anim={anim}
        flipX={flipX}
        hidden={anySectionOpen}
      />
    </div>
  );
}
