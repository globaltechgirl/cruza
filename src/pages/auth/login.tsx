import { FC } from "react";
import { Stack, Box, Text } from "@mantine/core";

const Login: FC = () => {
  const styles = {
    container: {
      flex: 1,                
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "var(--light-100)",
      borderRadius: 8,
      gap: 6,
    },
    headerBox: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "var(--light-200)",
      borderRadius: 8,
      padding: 10,
      flexShrink: 0,           
    },
    title: {
      fontSize: 18,
      fontWeight: 450,
      color: "var(--dark-100)",
    },
    bodyWrapper: {
      flex: 1,                
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    bodyBox: {
      flex: 1,              
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    layoutStyles: {
      flex: 1,                 
      minHeight: 0,
      display: "grid",
      gridTemplateColumns: "2.5fr 1fr",
      gridAutoRows: "min-content",
      gap: 10,
      width: "100%",
    },
  } as const;

  return (
    <Stack style={styles.container}>
      <Box style={styles.headerBox}>
        <Text style={styles.title}>Login</Text>
      </Box>

      <Box style={styles.bodyWrapper}>
        <Box style={styles.bodyBox} />
      </Box>
    </Stack>
  );
};

export default Login;
