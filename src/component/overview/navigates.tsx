import { FC } from "react";
import { Box, Text } from "@mantine/core";
import GoogleIcon from "@/assets/icons/google";
import Logo from "@/assets/cruizr.svg?react";
import Icon from "@/assets/icon.svg";

const styles = {
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, var(--dark-300) 0%, var(--dark-300) 50%, var(--dark-300) 100%)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noiseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
    filter: "url(#noiseFilter)",
    opacity: 0.2,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  iconBox: {
    width: 280,
    height: 280,
    objectFit: "contain",
    objectPosition: "center",
  },
  logoWrapper: {
    position: "absolute",
    top: "58%",
    left: "50%",
    transform: "translate(-50%, -58%)",
    zIndex: 4,
  },
  logoBox: {
    width: 60,
    height: 60,
  },
  bottomWrapper: {
    position: "absolute",
    bottom: 0,
    width: "140%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    zIndex: 3,
  },
  bottomBox: {
    width: "100%",
    height: 350,
    backgroundColor: "var(--light-100)",
    borderTopLeftRadius: "120% 100%",
    borderTopRightRadius: "120% 100%",
    transform: "translateY(20%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 60,
    gap: 30,
  },
  bottomTitles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
  },
  bottomTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: "var(--dark-100)",
    lineHeight: 1.4,
  },
  bottomSubtitle: {
    maxWidth: 300,
    fontSize: 13,
    color: "var(--dark-100)",
    fontWeight: 500, 
    lineHeight: 1.6,
  },
  bottomBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  primaryBtn: {
    width: 320,
    height: 45,
    borderRadius: 15,
    backgroundColor: "var(--dark-300)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: 550,
    color: "var(--dark-200)",
  },
  secondaryBtn: {
    width: 320,
    height: 45,
    borderRadius: 15,
    backgroundColor: "var(--dark-200)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: 450,
    color: "var(--light-100)",
  },
} as const;

const Navigate: FC = () => {
  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>
      <Box style={styles.noiseOverlay} />

      <Box style={styles.iconWrapper}>
        <img src={Icon} alt="icon" style={styles.iconBox} />
      </Box>

      <Box style={styles.logoWrapper}>
        <Logo style={styles.logoBox} />
      </Box>

      <Box style={styles.bottomWrapper}>
        <Box style={styles.bottomBox}>
          <Box style={styles.bottomTitles}>
            <Text style={styles.bottomTitle}>Welcome to Cruza!</Text>
            <Text style={styles.bottomSubtitle}>Live scores, breaking news, and exclusive.</Text>
          </Box>

          <Box style={styles.bottomBtn}>
            <Box style={styles.primaryBtn}>
              <GoogleIcon width={16} height={16} />
              <Text style={styles.primaryText}>Continue with Google</Text>
            </Box>

            <Box style={styles.secondaryBtn}>
              <Text style={styles.secondaryText}>I already have an account</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigate;