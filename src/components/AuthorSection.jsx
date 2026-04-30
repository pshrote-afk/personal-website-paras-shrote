import { styles } from "../styles/styles";

/**
 * AuthorSection
 * The panel that slides in from the north when the Author button is toggled.
 *
 * Props:
 *  visible - boolean
 */
export default function AuthorSection({ visible }) {
  const containerStyle = {
    ...styles.authorBase,
    ...(visible ? styles.authorShow : {}),
  };

  return (
    <div style={containerStyle} aria-hidden={!visible}>
      <div style={styles.cardBase}>
        <div style={styles.upperContainer}>
          <div style={styles.imageContainer}>
            <img
              src="/assets/img/profile_avatar.svg"
              alt="profile"
              style={styles.profileImg}
            />
          </div>
        </div>
        <div style={styles.lowerContainer}>
          <h3 style={styles.h3}>Shrote</h3>
          <h4 style={styles.h4}>Author, Developer, Triathlete.</h4>
          <p style={styles.p}>
            I like climbing trees. Sometimes I read, other times I write. Always I observe.
          </p>
          <a href="#" style={styles.btn}>Contact now</a>
        </div>
      </div>
    </div>
  );
}
