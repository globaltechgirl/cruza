import { FC } from "react";
import { Box, Button, Text } from "@mantine/core";
import Nigeria from "@/assets/nigeria.svg";

interface PhoneProps {
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

const Phone: FC<PhoneProps> = ({ onNext }) => {
  return (
    <Box style={styles.contentBox}>
      <Box style={styles.smallBar} />
      <Text style={styles.title}>Join us via phone number</Text>
      <Text style={styles.subtitle}>We'll text a code to verify your phone</Text>

      <Box style={styles.phoneInputWrapper}>
        <img src={Nigeria} alt="Nigeria Flag" style={styles.flag} />
        <Text style={styles.countryCode}>+234</Text>
        <input type="text" placeholder="Enter phone number" style={styles.textField} />
      </Box>

      <Button style={styles.primaryBtn} onClick={onNext}>
        Next
      </Button>
    </Box>
  );
};

export default Phone;
