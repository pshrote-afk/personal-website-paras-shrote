/**
 * NebulaButton
 * The animated cosmic checkbox button used for North / East / West navigation.
 *
 * Props:
 *  id       - HTML id for the wrapper div
 *  label    - Text label shown above the button
 *  checked  - Whether the button is in its active (checked) state
 *  onChange - Callback fired when the checkbox changes
 *  position - "north" | "east" | "west"  — controls fixed positioning
 */
export default function NebulaButton({ id, label, checked, onChange, position }) {
  const posStyle = {
    north: { position: "fixed", top: 0,   left: "50%", transform: "translateX(-50%)", marginTop:   20 },
    east:  { position: "fixed", right: 0, top: "50%",  transform: "translateY(-50%)", marginRight: 20 },
    west:  { position: "fixed", left: 0,  top: "50%",  transform: "translateY(-50%)", marginLeft:  20 },
  }[position];

  const p = position; // shorthand for scoped class names

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');

        .nb-${p} {
          font-family: 'Space Mono', monospace;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1000;
        }
        .nb-${p} .nb-label {
          margin-bottom: 5px;
          font-size: 14px;
          color: #4b5eaa;
          user-select: none;
          white-space: nowrap;
        }
        .nb-${p} label {
          display: inline-block;
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        .nb-${p} label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .nb-${p} .cb-wrap {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nb-${p} .checkmark {
          position: absolute;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #0a0a23, #1c2526);
          border: 2px solid #4b5eaa;
          border-radius: 12px;
          transition:
            transform  0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55),
            background 0.3s ease-in-out,
            border-color 0.3s ease,
            border-radius 0.3s ease;
          box-shadow: 0 0 8px rgba(75, 94, 170, 0.3);
        }
        .nb-${p}:hover .checkmark {
          transform: scale(1.1);
          box-shadow: 0 0 12px rgba(75, 94, 170, 0.5);
        }
        .nb-${p} .checkmark.active {
          background: linear-gradient(135deg, #ff5e62, #ffd452);
          border-color: #ffd452;
          border-radius: 50%;
          transform: rotate(45deg) scale(1.2);
          box-shadow: 0 0 20px rgba(255, 212, 82, 0.8);
        }
        .nb-${p} .nebula-glow {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(75,94,170,0.3) 10%, transparent 70%);
          border-radius: 50%;
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nb-${p} .nebula-glow.active {
          opacity: 1;
          transform: rotate(180deg);
          background: radial-gradient(circle, rgba(255,94,170,0.5) 10%, rgba(255,212,82,0.3) 70%);
          animation: nb-swirl-${p} 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes nb-swirl-${p} {
          0%   { transform: rotate(0deg);   }
          100% { transform: rotate(360deg); }
        }
        .nb-${p} .sparkle {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .nb-${p} .sparkle::before,
        .nb-${p} .sparkle::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd452;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.6s ease;
        }
        .nb-${p} .sparkle.active::before {
          transform: translate(12px, -12px);
          opacity: 1;
          animation: nb-twinkle-${p} 0.8s cubic-bezier(0.5, 0, 0.5, 1) forwards;
        }
        .nb-${p} .sparkle.active::after {
          transform: translate(-12px, 12px);
          opacity: 1;
          animation: nb-twinkle-${p} 0.8s 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards;
        }
        @keyframes nb-twinkle-${p} {
          0%   { opacity: 0; transform: scale(0.5); }
          50%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>

      <div className={`nb-${p}`} style={posStyle} id={id}>
        <div className="nb-label">{label}</div>
        <label>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <div className="cb-wrap">
            <div className={`checkmark ${checked ? "active" : ""}`} />
            <div className={`nebula-glow ${checked ? "active" : ""}`} />
            <div className={`sparkle ${checked ? "active" : ""}`} />
          </div>
        </label>
      </div>
    </>
  );
}
