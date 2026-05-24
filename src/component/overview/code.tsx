import { FC } from "react";
import { Box, Button, Text } from "@mantine/core";

interface CodeProps {
  onNext: () => void; 
}

const styles = {
  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    width: "100%",
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
  subtitle: {
    fontSize: 13,
    fontWeight: 550,
    color: "var(--dark-200)",
    textAlign: "center",
    marginBottom: 10,
  },
  codeInputWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 48,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    borderRadius: 12,
    border: "1px solid var(--light-100)",
    backgroundColor: "var(--light-300)",
    outline: "none",
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

const Code: FC<CodeProps> = ({ onNext }) => {
  return (
    <Box style={styles.contentBox}>
      <Box style={styles.smallBar} />
      <Text style={styles.title}>Confirmation Code</Text>
      <Text style={styles.subtitle}>We sent your code via SMS to +234 </Text>

      <Box style={styles.codeInputWrapper}>
        <input type="text" maxLength={1} style={styles.codeInput} />
        <input type="text" maxLength={1} style={styles.codeInput} />
        <input type="text" maxLength={1} style={styles.codeInput} />
        <input type="text" maxLength={1} style={styles.codeInput} />
        <input type="text" maxLength={1} style={styles.codeInput} />
      </Box>

      <Button style={styles.primaryBtn} onClick={onNext}>
        Next
      </Button>
    </Box>
  );
};

export default Code;
