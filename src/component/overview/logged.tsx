import { FC } from "react";
import { Box, Button, CheckIcon, Text } from "@mantine/core";

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
  checkBg: {
    borderRadius: "50%",
    backgroundColor: "var(--dark-100)",
    width: 60,         
    height: 60,         
    display: "flex",    
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  checkIcon: {
    width: 30,
    height: 30,
    color: "var(--light-100)",
    marginTop: 2.5,
  },
  title: {
    fontSize: 17,
    fontWeight: 650,
    color: "var(--dark-100)",
    textAlign: "center",
    marginBottom: 15,
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

const Logged: FC = () => {
  return (
    <Box style={styles.contentBox}>
      <Box style={styles.smallBar} />
      
      <Box style={styles.checkBg}>
        <CheckIcon style={styles.checkIcon} />
      </Box>

      <Text style={styles.title}>Logged in successfully!</Text>

      <Button style={styles.primaryBtn}>
        Complete
      </Button>
    </Box>
  );
};

export default Logged;
