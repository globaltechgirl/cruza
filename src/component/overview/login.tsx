import { FC, useState, useEffect } from "react";
import { Box, Button, Text } from "@mantine/core";
import GoogleIcon from "@/assets/icons/google";
import Phone from "./phone";
import Code from "./code";
import Logged from "./logged";
import Started from "./started";

const styles = {
  contentBox: {
    position: "absolute", 
    left: "50%",
    transform: "translateX(-50%) translateY(20px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    opacity: 0,
    transition: "opacity 0.4s ease, transform 0.4s ease",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px) saturate(150%)",
    WebkitBackdropFilter: "blur(20px) saturate(150%)",
    border: "1px solid var(--light-100)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    borderRadius: 30,
    padding: 15,
    zIndex: 1,
  },
  contentVisible: {
    opacity: 1,
    transform: "translate(-50%, 0)",
  },
  contentBoxs: {
    position: "absolute", 
    left: "50%",
    transform: "translateX(-50%) translateY(20px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    opacity: 0,
    transition: "opacity 0.4s ease, transform 0.4s ease",
    width: "100%",
    zIndex: 1,
  },
  smallBar: {
    width: 32,
    height: 4,
    backgroundColor: "var(--dark-100)",
    borderRadius: 2,
    marginBottom: 20,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--dark-100)",
    marginLeft: 8,
  },
  linkText: {
    fontSize: 13,
    fontWeight: 550,
    color: "var(--dark-200)",
    textAlign: "center",
    marginTop: 10,
  },
  linkSpan: {
    color: "var(--dark-100)",
    textDecorationLine: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "2px",
    textDecorationColor: "var(--dark-100)",
    cursor: "pointer"
  },
  revealTop: {
    position: "absolute",
    bottom: "6%", 
    left: "50%",
    transform: "translate(-50%, 20px)",
  },
} as const;

const Login: FC = () => {
  const [step, setStep] = useState<"started" | "login" | "phone" | "code" | "logged">("login");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, [step]);

  const goNext = (nextStep: "started" | "login" | "phone" | "code" | "logged") => {
    setVisible(false); 
    setTimeout(() => setStep(nextStep), 300); 
  };

  return (
    <>
      {step === "login" && (
        <Box style={{ ...styles.contentBox, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Box style={styles.smallBar} />
          <Button style={styles.primaryBtn} onClick={() => goNext("phone")}>
            Continue with Phone
          </Button>
          <Button style={styles.secondaryBtn}>
            <GoogleIcon width={16} height={16} />
            <Text style={styles.secondaryText}>Continue with Google</Text>
          </Button>
          <Text style={styles.linkText}>
            Already have an account? <span style={styles.linkSpan} onClick={() => goNext("started")}>Sign in</span>
          </Text>
        </Box>
      )}

      {step === "started" && (
        <Box style={{ ...styles.contentBoxs, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Started />
        </Box>
      )}

      {step === "phone" && (
        <Box style={{ ...styles.contentBox, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Phone onNext={() => goNext("code")} />
        </Box>
      )}

      {step === "code" && (
        <Box style={{ ...styles.contentBox, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Code onNext={() => goNext("logged")} />
        </Box>
      )}

      {step === "logged" && (
        <Box style={{ ...styles.contentBox, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Logged />
        </Box>
      )}
    </>
  );
};

export default Login;
