import { FC, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import Logo from "@/assets/cruza.svg?react";
import Navigate from "./navigates";

const styles = {
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, var(--light-100) 0%, var(--light-100) 50%, var(--light-100) 100%)",
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
  initialLogo: {
    width: 50,
    height: 50,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
} as const;

const Overviewer: FC = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (done) return <Navigate />;

  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>
      <Box style={styles.noiseOverlay} />
      <Logo style={styles.initialLogo} />
    </Box>
  );
};

export default Overviewer;