import { FC, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import Card from "./card";
import GridIcon from "@/assets/icons/grid";
import { IconX } from "@tabler/icons-react";
import ChatIcon from "@/assets/icons/chat";
import CameraIcon from "@/assets/icons/camera";
import Camera from "./camera";
import Chat from "./chat";
import Map from "./map";
import MapIcon from "@/assets/icons/map";

const containerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};


type Props = {
  isVisible?: boolean;
};

const Main: FC<Props> = ({ isVisible = true }) => {
  const navigate = useNavigate();
  const [offerAccepted, setOfferAccepted] = useState(false);
  
  const MIN_HEIGHT = 56;
  const MAX_HEIGHT = 96;

  const [cameraOpen, setCameraOpen] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(MIN_HEIGHT);
  const [chatOpen, setChatOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);
  const startHeight = useRef(MIN_HEIGHT);
  const raf = useRef<number | null>(null);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const updateHeight = (clientY: number) => {
    const diff = startY.current - clientY;

    const next = clamp(
      startHeight.current + diff * 0.15,
      MIN_HEIGHT,
      MAX_HEIGHT
    );

    setOverlayHeight(next);
  };

  const startDrag = (y: number) => {
    setIsDragging(true);
    startY.current = y;
    startHeight.current = overlayHeight;
  };

  const stopDrag = () => {
    setIsDragging(false);

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", stopDrag);

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", stopDrag);

    if (raf.current) cancelAnimationFrame(raf.current);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (raf.current) cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      updateHeight(e.clientY);
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    if (raf.current) cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      updateHeight(e.touches[0].clientY);
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientY);

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stopDrag);
  };

  const toggleSheet = () => {
    setOverlayHeight((prev) =>
      prev < 80 ? MAX_HEIGHT : MIN_HEIGHT
    );
  };

  const closeSheet = () => {
    setOverlayHeight(MIN_HEIGHT);
    setCameraOpen(false);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "20px 15px",
      gap: 30,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      overflow: "hidden",
      position: "relative",
      background: "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
    },
    noise: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      zIndex: 0,
      pointerEvents: "none",
      filter: "url(#noiseFilter)",
      opacity: 0.2,
    },
    top: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 2,
    },
    icons: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    icon: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      justifyContent: offerAccepted ? "space-between" : "center",
      alignItems: "center",
      gap: 30,
      width: "100%",
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative",
      zIndex: 1,
    },
    card: {
      width: "96%",
    },
    bottoms: {
      width: "96%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    bottom: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    },
    text: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    overlays: {
      position: "fixed",
      inset: 0,
      zIndex: 998,
    },
    overlay: {
      position: "fixed",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "96%",
      height: `${overlayHeight}vh`,
      zIndex: 999,
      transition: isDragging ? "none" : "height 0.25s ease",
      willChange: "transform, height",
    },
    handles: {
      position: "absolute",
      top: 15,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      cursor: isDragging ? "grabbing" : "grab",
      touchAction: "none",
    },
    handle: {
      width: 30,
      height: 3.5,
      borderRadius: 4,
      backgroundColor: "var(--dark-400)",
      cursor: isDragging ? "grabbing" : "grab",
      opacity: 0.7,
    },
    component: {
      position: "fixed",
      left: "50%",
      bottom: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      zIndex: 999,
      transition: "transform 0.35s ease",
      backgroundColor: "var(--light-100)",
    },
  } as const;

  return (
    <>
      <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
        <svg style={{ display: "none" }}>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          </filter>
        </svg>

        <Box style={styles.noise} />

        <motion.div style={styles.top} variants={itemVariants}>
          <Box style={styles.icons}>
            <GridIcon style={styles.icon} onClick={() => navigate(ROUTES.ACTIVITY)} />
          </Box>
          <Box style={styles.icons} onClick={() => navigate(ROUTES.DRIVER)}>
            <IconX style={styles.icon} />
          </Box>
        </motion.div>

        <motion.div style={styles.body} onClick={() => { if (cameraOpen) closeSheet(); }} variants={itemVariants}>
          <Box style={styles.card}>
            <Card offerAccepted={offerAccepted} setOfferAccepted={setOfferAccepted} />
          </Box>
        
          {offerAccepted && (
            <Box style={styles.bottoms}>
              <Box style={styles.bottom}>
                <Box style={styles.icons} onClick={() => setCameraOpen(true)}>
                  <CameraIcon style={styles.icon} />
                </Box>
                <Text style={styles.text}>Camera</Text>
              </Box>

              <Box style={styles.bottom}>
                <Box
                  style={styles.icons}
                  onClick={() => setChatOpen(true)}
                >
                  <ChatIcon style={styles.icon} />
                </Box>
                <Text style={styles.text}>Messages</Text>
              </Box>

              <Box style={styles.bottom}>
                <Box
                  style={styles.icons}
                  onClick={() => setMapOpen(true)}
                >
                  <MapIcon style={styles.icon} />
                </Box>
                <Text style={styles.text}>Map</Text>
              </Box>  
            </Box>
          )}
        </motion.div>
      </motion.div>

      {cameraOpen && (
        <Box style={styles.overlays} onClick={closeSheet}>
          <Box style={styles.overlay} onClick={(e) => e.stopPropagation()}>
            <Box
              style={styles.handles}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onClick={toggleSheet}
            >
              <Box style={styles.handle} />
            </Box>
            <Camera />
          </Box>
        </Box>
      )}

      {chatOpen && (
        <Box 
          style={{ 
            ...styles.component, 
            transform: chatOpen ? "translate(-50%, 0)" : "translate(-50%, 100%)" 
          }} 
          onClick={() => setChatOpen(false)}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <Chat onClose={() => setChatOpen(false)} />
          </Box>
        </Box>
      )}

      {mapOpen && (
        <Box 
          style={{ 
            ...styles.component, 
            transform: mapOpen ? "translate(-50%, 0)" : "translate(-50%, 100%)" 
          }} 
          onClick={() => setMapOpen(false)}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <Map onClose={() => setMapOpen(false)} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Main;