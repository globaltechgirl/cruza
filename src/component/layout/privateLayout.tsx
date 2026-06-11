import type { FC, CSSProperties } from "react";
import { AppShell, Box } from "@mantine/core";
import { Outlet} from "react-router-dom";

const PrivateLayout: FC = () => {
  const styles: Record<string, CSSProperties> = {
    appShell: {
      minHeight: "calc(var(--vh) * 100)",
      backgroundColor: "var(--light-200)",
    },
    mainWrapper: {
      minHeight: "calc(var(--vh) * 100)",
      overflow: "visible",
    },
    mainBox: {
      minHeight: "100%",
    },
  };

  return (
    <AppShell padding={0} style={styles.appShell}>
      <AppShell.Main style={styles.mainWrapper}>
        <Box style={styles.mainBox}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;