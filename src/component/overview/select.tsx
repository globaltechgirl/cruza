import { FC } from "react";
import { Box, Button, Text } from "@mantine/core";

interface SelectProps {
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
    marginBottom: "-4px",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 550,
    color: "var(--dark-200)",
    textAlign: "center",
    marginBottom: 10,
  },
  selectInputWrapper: {
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
  textField: {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: 14,
    fontWeight: 550,
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

const Select: FC<SelectProps> = ({ onNext }) => {
  return (
    <Box style={styles.contentBox}>
      <Box style={styles.smallBar} />
      <Text style={styles.title}>Select University</Text>
      <Text style={styles.subtitle}>Select university to personalize your experience</Text>

      <Box style={styles.selectInputWrapper}>
        <input type="text" placeholder="Enter University" style={styles.textField} />
      </Box>

      <Button style={styles.primaryBtn} onClick={onNext}>
        Next
      </Button>
    </Box>
  );
};

export default Select;
