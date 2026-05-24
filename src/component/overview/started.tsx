import { FC, useState, useEffect } from "react";
import { Box, Button, Text } from "@mantine/core";
import GoogleIcon from "@/assets/icons/google";
import Nigeria from "@/assets/nigeria.svg";
import AppleIcon from "@/assets/icons/apple";
import MailIcon from "@/assets/icons/mail";
import Logged from "./logged";
import Code from "./code";
import Login from "./login";
import Select from "./select";
import Info from "./info";
import Terms from "./terms";

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
  title: {
    fontSize: 17,
    fontWeight: 650,
    color: "var(--dark-100)",
    textAlign: "center",
    marginBottom: 10,
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
  phoneInputWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 48,
    borderRadius: 30,
    border: "1px solid var(--light-100)",
    padding: "0 20px",
    backgroundColor: "var(--light-300)",
    gap: 14,
  },
  flag: {
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  countryCode: {
    fontSize: 14,
    fontWeight: 600,
  },
  textField: {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: 14,
    fontWeight: 550,
  },
  hrBox: {
    display: "flex",
    alignItems: "center",
    width: "95%",
    gap: 10,
    margin: "5px 0",
  },
  hrLine: {
    flex: 1, 
    border: "none", 
    borderTop: "1.2px solid var(--dark-100)",
    opacity: 0.85
  },
  hrText: {
    whiteSpace: "nowrap", 
    color: "var(--dark-100)", 
    fontSize: 13, 
    fontWeight: 550,
    opacity: 0.9
  },
  secondaryBtns: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
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

const Started: FC = () => {
  const [step, setStep] = useState<"signup" | "login" | "code" | "info" | "select" | "terms" | "logged">("signup");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, [step]);

  const goNext = (nextStep: "signup" | "login" | "code" | "info" | "select" | "terms" | "logged") => {
    setVisible(false); 
    setTimeout(() => setStep(nextStep), 300); 
  };

  return (
    <>
      {step === "signup" && (
        <Box style={{ ...styles.contentBox, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Box style={styles.smallBar} />

          <Text style={styles.title}>Welcome to Cruizr</Text>

          <Box style={styles.phoneInputWrapper}>
            <img src={Nigeria} alt="Nigeria Flag" style={styles.flag} />
            <Text style={styles.countryCode}>+234</Text>
            <input type="text" placeholder="Enter phone number" style={styles.textField} />
          </Box>

          <Button style={styles.primaryBtn} onClick={() => goNext("info")}>
            Continue
          </Button>

          <Box style={styles.hrBox}>
            <hr style={styles.hrLine} />
            <Text style={styles.hrText}>or</Text>
            <hr style={styles.hrLine} />
          </Box>

          <Button style={styles.secondaryBtn}>
            <AppleIcon width={20} height={20} />
            <Text style={styles.secondaryText}>Continue with Apple</Text>
          </Button>

          <Button style={styles.secondaryBtn}>
            <GoogleIcon width={16} height={16} />
            <Text style={styles.secondaryText}>Continue with Google</Text>
          </Button>

          <Button style={styles.secondaryBtn}>
            <MailIcon width={17} height={17} />
            <Text style={styles.secondaryText}>Continue with Email</Text>
          </Button>

          <Text style={styles.linkText}>
            Already have an account? <span style={styles.linkSpan} onClick={() => goNext("login")}>Login</span>
          </Text>
        </Box>
      )}

      {step === "login" && (
        <Box style={{ ...styles.contentBoxs, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Login />
        </Box>
      )}

      {step === "code" && (
        <Box style={{ ...styles.contentBox, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Code onNext={() => goNext("info")} />
        </Box>
      )}

      {step === "info" && (
        <Box style={{ ...styles.contentBoxs, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Info onNext={() => goNext("select")} />
        </Box>
      )}

      {step === "select" && (
        <Box style={{ ...styles.contentBoxs, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Select onNext={() => goNext("terms")} />
        </Box>
      )}

      {step === "terms" && (
        <Box style={{ ...styles.contentBoxs, ...styles.revealTop, ...(visible ? styles.contentVisible : {}) }}>
          <Terms onNext={() => goNext("logged")} />
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

export default Started;
