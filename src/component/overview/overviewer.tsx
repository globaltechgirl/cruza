import { FC, useEffect, useState } from "react";
import { Box, Button, Text } from "@mantine/core";
import Logo from "@/assets/logo.svg?react";
import Login from "./login";
import Started from "./started";

const styles = {
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, var(--light-100) 0%, var(--light-100) 50%, var(--light-100) 100%)",
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
  initialLogo: {
    width: 50,
    height: 50,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "opacity 0s ease",
    zIndex: 2,
  },
  contentBox: {
    position: "absolute",
    bottom: "6%",
    left: "50%",
    transform: "translate(-50%, 20px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    opacity: 0,
    transition: "opacity 0.4s ease, transform 0.4s ease",
    width: "95%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px) saturate(150%)",
    WebkitBackdropFilter: "blur(20px) saturate(150%)",
    border: "1px solid var(--light-100)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    borderRadius: 30,
    padding: 15,
    zIndex: 1,
  },
  contentBoxs: {
    position: "absolute",
    bottom: 0,  
    left: "50%",
    height: "100%",     
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", 
    gap: 12,
    opacity: 0,
    transition: "opacity 1s ease, transform 1s ease",
    transform: "translate(-50%, 20px)",
    width: "95%",
    zIndex: 1,
  },
  contentVisible: {
    opacity: 1,
    transform: "translate(-50%, 0)",
  },
  logoInContent: {
    width: 45,
    height: 45,
    marginBottom: 5,
  },
  smallBar: {
    width: 32,
    height: 4,
    backgroundColor: "var(--dark-100)",
    borderRadius: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 650,
    color: "var(--dark-100)",
    textAlign: "center",
    marginBottom: "-4px",
  },
  topText: {
    fontSize: 13,
    fontWeight: 550,
    color: "var(--dark-200)",
    textAlign: "center",
    marginBottom: 18,
  },
  primaryBtn: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    backgroundColor: "var(--dark-100)",
    color: "var(--light-100)",
    fontSize: 14,
    fontWeight: 600,
  },
  secondaryBtn: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    backgroundColor: "var(--light-200)",
    color: "var(--dark-100)",
    fontSize: 14,
    fontWeight: 600,
  },
} as const;

const Overviewer: FC = () => {
  const [dropped, setDropped] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [showStarted, setShowStarted] = useState(false);
  const [startedVisible, setStartedVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDropped(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showLogin) {
      requestAnimationFrame(() => setLoginVisible(true));
    } else {
      setLoginVisible(false);
    }
  }, [showLogin]);

  useEffect(() => {
    if (showStarted) {
      requestAnimationFrame(() => setStartedVisible(true));
    } else {
      setStartedVisible(false);
    }
  }, [showStarted]);

  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noiseOverlay} />

      <Logo
        style={{
          ...styles.initialLogo,
          opacity: dropped ? 0 : 1,
        }}
      />

      {!showLogin && !showStarted && (
        <Box
          style={{
            ...styles.contentBox,
            ...(dropped ? styles.contentVisible : {}),
          }}
        >
          <Box style={styles.smallBar} />
          <Logo style={styles.logoInContent} />
          <Text style={styles.title}>Welcome to Cruizr</Text>
          <Text style={styles.topText}>Simplifying every ride, all in one app.</Text>
          <Button style={styles.primaryBtn} onClick={() => setShowStarted(true)}>Get Started</Button>
          <Button style={styles.secondaryBtn} onClick={() => setShowLogin(true)}>
            Login
          </Button>
        </Box>
      )}

      {showLogin && (
        <Box
          style={{
            ...styles.contentBoxs,
            ...(loginVisible ? styles.contentVisible : {}),
          }}
        >
          <Login />
        </Box>
      )}

      {showStarted && (
        <Box
          style={{
            ...styles.contentBoxs,
            ...(startedVisible ? styles.contentVisible : {}),
          }}
        >
          <Started />
        </Box>
      )}
    </Box>
  );
};

export default Overviewer;
