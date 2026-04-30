import { useState } from "react";
import { styles } from "../styles/styles";

const ORIGINAL_BIO = "I like climbing trees. Sometimes I read, other times I write. Always I observe.";
const CONTACT_TEXT = "Email: pshrote1@gmail.com<br><br>WhatsApp: +91 7744009712";
const TYPING_SPEED = 25; // ms per character (~160 WPM)

/**
 * ProfileCard
 * The main center card with name, bio, and contact typewriter toggle.
 *
 * Props:
 *  imageRef - ref attached to the profile image container (used by useSamurai for initial placement)
 *  hideMode - null | "down" | "left" | "right"  — which slide-out animation to apply
 */
export default function ProfileCard({ imageRef, hideMode }) {
  const [isContact, setIsContact] = useState(false);
  const [bioHtml,   setBioHtml]   = useState(ORIGINAL_BIO);
  const [typing,    setTyping]    = useState(false);
  const [btnHover,  setBtnHover]  = useState(false);

  const typeText = (text) => {
    setTyping(true);
    let i = 0;
    const tick = () => {
      i++;
      setBioHtml(text.substring(0, i) + '<span class="typing-cursor">|</span>');
      if (i < text.length) {
        setTimeout(tick, TYPING_SPEED);
      } else {
        setBioHtml(text);
        setTyping(false);
      }
    };
    setBioHtml("");
    tick();
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    if (typing) return;
    if (!isContact) {
      setIsContact(true);
      typeText(CONTACT_TEXT);
    } else {
      setIsContact(false);
      setBioHtml(ORIGINAL_BIO);
    }
  };

  const cardStyle = {
    ...styles.cardBase,
    ...(hideMode === "down"  ? styles.cardSlideDownHide  : {}),
    ...(hideMode === "left"  ? styles.cardSlideLeftHide  : {}),
    ...(hideMode === "right" ? styles.cardSlideRightHide : {}),
  };

  return (
    <div style={cardStyle}>
      <div style={styles.upperContainer}>
        {/* imageRef lets useSamurai read this element's position */}
        <div ref={imageRef} style={styles.imageContainer} />
      </div>

      <div style={styles.lowerContainer}>
        <h3 style={styles.h3}>Paras Shrote</h3>
        <h4 style={styles.h4}>Developer, Author, Triathlete.</h4>

        <p
          style={styles.p}
          dangerouslySetInnerHTML={{ __html: bioHtml }}
        />

        <a
          href="#"
          style={{
            ...styles.btn,
            ...(btnHover ? styles.btnHover : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={handleBtnClick}
        >
          {isContact ? "Info" : "Contact now"}
        </a>
      </div>
    </div>
  );
}
