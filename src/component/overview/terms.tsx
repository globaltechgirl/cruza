import { FC, useState } from "react";
import { Box, Button, CheckIcon, Text } from "@mantine/core";

interface TermsProps {
  onNext: () => void; 
}

const styles = {
  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
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
  subtitle: {
    fontSize: 13,
    fontWeight: 500,
    color: "var(--dark-200)",
    textAlign: "left",
    lineHeight: 1.6
  },
  subspan: {
    color: "var(--dark-100)",
    textDecorationLine: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "2px",
    textDecorationColor: "var(--dark-100)",
    cursor: "pointer",
    opacity: 0.9
  },
  agreeWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "98%",
    height: 48,
    cursor: "pointer", 
  },
  agreeText: {
    fontSize: 13,
    fontWeight: 500,
    color: "var(--dark-200)",
    textAlign: "left",
  },
  checkBg: {
    borderRadius: 2,
    backgroundColor: "var(--light-100)",
    width: 18,         
    height: 18,         
    display: "flex",    
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {
    width: 10,
    height: 10,
    color: "var(--dark-100)",
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
} as const;

const Terms: FC<TermsProps> = ({ onNext }) => {
  const [agreed, setAgreed] = useState(false); 

  return (
    <Box style={styles.contentBox}>
      <Box style={styles.smallBar} />
      <Text style={styles.title}>Terms & Privacy Notice</Text>

      <Text style={styles.subtitle}>
        By selecting "I Agree" below, I have reviewed and agree to the 
        <span style={styles.subspan}> Terms of Use </span> 
        and acknowledge the 
        <span style={styles.subspan}> Privacy Notice</span> 
        . I am at least 18 years of age.
      </Text>
      
      <Box
        style={styles.agreeWrapper}
        onClick={() => setAgreed((prev) => !prev)} 
      >
        <Text style={styles.agreeText}>I Agree</Text>

        <Box style={styles.checkBg}>
          {agreed && <CheckIcon style={styles.checkIcon} />}
        </Box>
      </Box>

      <Button style={styles.primaryBtn} onClick={onNext}>
        Next
      </Button>
    </Box>
  );
};

export default Terms;
