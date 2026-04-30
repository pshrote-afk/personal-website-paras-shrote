import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useSamurai
 * Manages the samurai character's position, animation state, and
 * proximity-based interaction with nebula buttons.
 *
 * @param {React.RefObject} profileRef  - ref to the profile image container (for initial placement)
 * @param {Object}          nebulaRefs  - map of { key: { current: DOMNode, onActivate: fn } }
 */
export function useSamurai(profileRef, nebulaRefs) {
  const [pos,    setPos]    = useState({ x: 0, y: 0 });
  const [anim,   setAnim]   = useState("idle");
  const [flipX,  setFlipX]  = useState(false);

  const keysRef  = useRef({});
  const posRef   = useRef({ x: 0, y: 0 });
  const nearRef  = useRef({});
  const rafRef   = useRef(null);

  // Place samurai at center of profile container on mount
  useEffect(() => {
    if (!profileRef.current) return;
    const r = profileRef.current.getBoundingClientRect();
    const x = r.left + r.width  / 2 - 48;
    const y = r.top  + r.height / 2 - 48;
    posRef.current = { x, y };
    setPos({ x, y });
  }, [profileRef]);

  const checkProximity = useCallback(() => {
    const { x, y } = posRef.current;
    const cx = x + 100, cy = y + 100, D = 50;
    const result = {};
    Object.entries(nebulaRefs).forEach(([key, ref]) => {
      if (!ref.current) { result[key] = false; return; }
      const r = ref.current.getBoundingClientRect();
      result[key] =
        cx >= r.left - D && cx <= r.right  + D &&
        cy >= r.top  - D && cy <= r.bottom + D;
    });
    nearRef.current = result;
  }, [nebulaRefs]);

  // RAF game loop — movement only
  const gameLoop = useCallback(() => {
    const SPEED = 20;
    const { x, y } = posRef.current;
    let nx = x, ny = y;
    const k = keysRef.current;

    if (k["ArrowRight"] || k["d"]) nx = Math.min(nx + SPEED, window.innerWidth  - 200);
    if (k["ArrowLeft"]  || k["a"]) nx = Math.max(nx - SPEED, 0);
    if (k["ArrowUp"]    || k["w"]) ny = Math.max(ny - SPEED, 0);
    if (k["ArrowDown"]  || k["s"]) ny = Math.min(ny + SPEED, window.innerHeight - 200);

    if (nx !== x || ny !== y) {
      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
    }

    checkProximity();
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [checkProximity]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  // Key handlers
  const onKeyDown = useCallback((e) => {
    keysRef.current[e.key] = true;

    if (e.key === "ArrowRight" || e.key === "d") { setAnim("run"); setFlipX(false); }
    if (e.key === "ArrowLeft"  || e.key === "a") { setAnim("run"); setFlipX(true);  }
    if (["ArrowUp","ArrowDown","w","s"].includes(e.key)) setAnim("run");

    if (e.key === "k" || e.key === "K") {
      setAnim("attack");
      Object.entries(nearRef.current).forEach(([key, near]) => {
        if (near && nebulaRefs[key]?.onActivate) nebulaRefs[key].onActivate();
      });
    }
  }, [nebulaRefs]);

  const onKeyUp = useCallback((e) => {
    keysRef.current[e.key] = false;
    const k = keysRef.current;
    const moving = ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","a","d","w","s","k","K"]
      .some(key => k[key]);
    if (!moving) setAnim("idle");
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup",   onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return { pos, anim, flipX };
}
