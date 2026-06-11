import { FC, useRef, useState } from "react";
import { Box } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import Activity from "./activity";
import MapImage from "@/assets/map.jpg";
import Logo from "@/assets/logo.svg?react";
import Profile from "@/component/profile/main";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

const bodyVariants = {
  open: {
    height: "auto",
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
  closed: {
    height: 0,
    opacity: 0,
    y: 30,
    transition: { duration: 0.28 },
  },
};

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const MIN_HEIGHT = 70;
  const MAX_HEIGHT = 96;

  const [profileOpen, setProfileOpen] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(MIN_HEIGHT);
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
    setProfileOpen(false);
  };

  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "calc(var(--vh) * 100)",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
    },
    mapLayer: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${MapImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 0,
    },
    gradientLayer: {
      position: "absolute",
      inset: 0,
      background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.10) 100%)`,
      zIndex: 1,
      pointerEvents: "none",
    },
    noiseOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 2,
      pointerEvents: "none",
      filter: "url(#noiseFilter)",
      opacity: 0.2,
    },
    uiLayer: {
      position: "absolute",
      inset: 0,
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
    },
    box: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 15,
    },
    logo: {
      width: 35,
      height: 35,
      borderRadius: 6
    },
    value: {
      padding: "6px 12px",
      background: "rgba(229, 228, 226)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--dark-400)",
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 500,
      color: "var(--dark-200)",
      cursor: "pointer",
      width: "fit-content",
    },
    body: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 15,
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
    },
    blurOverlay: {
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      maskImage: `linear-gradient(to bottom, transparent 8%, black 18%, black 100%)`,
      WebkitMaskImage: `linear-gradient(to bottom, transparent 8%, black 18%, black 100%)`,
      background: `linear-gradient( to bottom, rgba(255,255,255,0.05) 8%, rgba(255,255,255,0.10) 8%, rgba(255,255,255,0.15) 100%)`,
      zIndex: 0,
    },
    content: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      flex: 1,
    },
    profileOverlays: {
      position: "fixed",
      inset: 0,
      zIndex: 998,
    },
    profileOverlay: {
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
    dragHandleWrap: {
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
    dragHandle: {
      width: 30,
      height: 3.5,
      borderRadius: 4,
      backgroundColor: "var(--dark-400)",
      cursor: isDragging ? "grabbing" : "grab",
      opacity: 0.7,
    },
  } as const;

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate="visible" onClick={() => setIsOpen((open) => !open)}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.mapLayer} />
      <Box style={styles.gradientLayer} />
      <Box style={styles.noiseOverlay} />

      <Box style={styles.uiLayer}>
        <motion.div style={styles.box} variants={itemVariants} initial={false} animate={isOpen ? "open" : "closed"} onClick={(event) => event.stopPropagation()}>
          <Logo style={styles.logo} />

          <Box style={styles.value} onClick={() => { setProfileOpen(true); }}>Profile</Box>
        </motion.div> 

        <motion.div style={styles.body} variants={bodyVariants} initial={false} animate={isOpen ? "open" : "closed"} onClick={(event) => event.stopPropagation()} >
          <Box style={styles.blurOverlay} />

          <Box style={styles.content}>
            <Activity  isVisible={isOpen} />
          </Box>
        </motion.div>

        <AnimatePresence>
          {profileOpen && (
            <Box style={styles.profileOverlays} onClick={(e) => { e.stopPropagation(); closeSheet(); }}>
              <motion.div
                style={styles.profileOverlay}
                onClick={(e) => e.stopPropagation()}
                initial={{ x: "-50%", y: "100%" }}
                animate={{ x: "-50%", y: 0 }}
                exit={{ x: "-50%", y: "100%" }}
                transition={{  type: "spring", stiffness: 260, damping: 26, duration: 0.28 }}
              >
                <Box style={styles.dragHandleWrap} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} onClick={toggleSheet}>
                  <Box style={styles.dragHandle} />
                </Box>

                <Profile />
              </motion.div>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default Main;