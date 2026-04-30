export const styles = {
  // ── Layout ──────────────────────────────────────────────────────────
  body: {
    margin: 0, padding: 0,
    background: "#fefefe",
    fontFamily: "'Space Mono', monospace",
    overflow: "hidden",
    width: "100vw", height: "100vh",
    position: "relative",
  },
  movementInstructions: {
    position: "fixed",
    top: "50%", left: "calc(50% - 160px - 210px)",
    transform: "translateY(-50%)",
    fontFamily: "'Space Mono', monospace",
    fontSize: 12, color: "#000",
    margin: 0, zIndex: 998, textAlign: "center",
    pointerEvents: "none",
  },
  attackInstructions: {
    position: "fixed",
    top: "50%", right: "calc(50% - 160px - 230px)",
    transform: "translateY(-50%)",
    fontFamily: "'Space Mono', monospace",
    fontSize: 12, color: "#000",
    margin: 0, zIndex: 998, textAlign: "center",
    pointerEvents: "none",
  },

  // ── Main card ────────────────────────────────────────────────────────
  cardBase: {
    width: 320, background: "#ffffff",
    border: "4px solid #000000",
    boxShadow: "8px 8px 0 #000",
    position: "fixed",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    transition: "top 0.6s ease, left 0.6s ease, opacity 0.6s ease",
    zIndex: 999,
  },
  cardSlideDownHide: {
    position: "fixed", top: "150%", left: "50%",
    transform: "translateX(-50%)",
    opacity: 0, pointerEvents: "none", zIndex: 998,
  },
  cardSlideLeftHide: {
    position: "fixed", left: "-50%", top: "50%",
    transform: "translateY(-50%)",
    opacity: 0, pointerEvents: "none", zIndex: 998,
  },
  cardSlideRightHide: {
    position: "fixed", left: "150%", top: "50%",
    transform: "translateY(-50%)",
    opacity: 0, pointerEvents: "none", zIndex: 998,
  },
  upperContainer: {
    height: 140, background: "#ffe600",
    borderBottom: "4px solid #000",
    display: "flex", justifyContent: "center", alignItems: "flex-end",
  },
  imageContainer: {
    width: 100, height: 100, background: "#ffffff",
    border: "4px solid #000",
    transform: "translateY(50%)",
    display: "flex", justifyContent: "center", alignItems: "center",
    position: "relative",
  },
  profileImg: { width: 90, height: 90, objectFit: "cover", border: "2px solid #000" },
  lowerContainer: { padding: "60px 20px 30px", textAlign: "center" },
  h3: { margin: 0, fontSize: 20, fontWeight: "bold", color: "#000" },
  h4: { margin: "5px 0 15px", fontSize: 14, color: "#333", fontWeight: "normal" },
  p: {
    fontSize: 14, color: "#000",
    border: "2px dashed #000", padding: 10,
    background: "#f0f0f0", marginBottom: 20,
  },
  btn: {
    display: "inline-block", padding: "10px 20px",
    background: "#ff006e", color: "#fff",
    textDecoration: "none", fontWeight: "bold",
    border: "3px solid #000", boxShadow: "4px 4px 0 #000",
    cursor: "pointer", fontFamily: "'Space Mono', monospace",
    fontSize: 14, transition: "all 0.2s ease",
  },
  btnHover: {
    background: "#fff", color: "#ff006e",
    border: "3px solid #ff006e", boxShadow: "none",
  },

  // ── Section containers ───────────────────────────────────────────────
  authorBase: {
    position: "fixed", top: "-100%", left: "50%",
    transform: "translateX(-50%)",
    width: 320, transition: "top 0.6s ease, opacity 0.6s ease",
    opacity: 0, pointerEvents: "none", zIndex: 999,
  },
  authorShow: {
    top: "50%", transform: "translate(-50%,-50%)",
    opacity: 1, pointerEvents: "auto",
  },
  eastBase: {
    position: "fixed", right: "-100%", top: "50%",
    transform: "translateY(-50%)",
    width: 320, transition: "right 0.6s ease, opacity 0.6s ease",
    opacity: 0, pointerEvents: "none", zIndex: 999,
  },
  eastShow: {
    right: "50%", transform: "translate(50%,-50%)",
    opacity: 1, pointerEvents: "auto",
  },
  westBase: {
    position: "fixed", left: "-100%", top: "50%",
    transform: "translateY(-50%)",
    width: 320, transition: "left 0.6s ease, opacity 0.6s ease",
    opacity: 0, pointerEvents: "none", zIndex: 999,
  },
  westShow: {
    left: "50%", transform: "translate(-50%,-50%)",
    opacity: 1, pointerEvents: "auto",
  },

  // ── Samurai ──────────────────────────────────────────────────────────
  samuraiContainer: { position: "fixed", zIndex: 1001, pointerEvents: "none" },
  samuraiSprite: {
    width: 96, height: 96,
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    transformOrigin: "center",
  },
};
