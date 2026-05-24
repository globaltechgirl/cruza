import { FC } from "react";
import { Box } from "@mantine/core";
import Activity from "./activity";
import Info from "./info";

const Main: FC = () => {
  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      gap: 6,
      overflow: "hidden",
      position: "relative",
      background: "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
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
    body: {
      backgroundColor: "var(--light-100)",
      padding: 15,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      position: "relative",
      zIndex: 1,
    }
  } as const;

  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noiseOverlay} />

      <Info />

      <Box style={styles.body}>
        <Activity />
      </Box>
    </Box>
  );
};

export default Main;