import { FC, useState, useEffect } from "react";
import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import Navigator from "./navigate";
import MapImage from "@/assets/map.jpg";
import { useNavigate } from "react-router-dom"; 
import { ROUTES } from "@/utils/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
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
    noise: {
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
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      padding: 15,
    },
    value: {
      padding: "4px 10px",
      background: "rgba(229, 228, 226)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--dark-400)",
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      cursor: "pointer",
      width: "fit-content",
    },
    box: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 15,
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
      minHeight: "calc(var(--vh) * 33)",
    },
    blurOverlay: {
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      maskImage: `linear-gradient(to bottom, transparent 0%, black 8%, black 100%)`,
      WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 8%, black 100%)`,
      background: `linear-gradient( to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.10) 8%, rgba(255,255,255,0.15) 100%)`,
      zIndex: 0,
    },
    content: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      flex: 1,
    },
  } as const;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [rideStarted, setRideStarted] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("rideStepStates");
      if (raw) {
        const parsed = JSON.parse(raw);
        setRideStarted(Boolean(parsed && parsed.rideArrived));
      }
    } catch {
      setRideStarted(false);
    }
    const onStorage = () => {
      try {
        const raw = window.localStorage.getItem("rideStepStates");
        if (raw) {
          const parsed = JSON.parse(raw);
          setRideStarted(Boolean(parsed && parsed.rideArrived));
        } else {
          setRideStarted(false);
        }
      } catch {
        setRideStarted(false);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  
  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate="visible" onClick={() => setIsOpen((open) => !open)}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.mapLayer} />
      <Box style={styles.gradientLayer} />
      <Box style={styles.noise} />

      <Box style={styles.uiLayer}>
        <Box style={styles.header}>
          <Box
            style={{
              ...styles.value,
              backgroundColor: rideStarted ? "rgba(255, 80, 80, 0.95)" : styles.value.background,
              color: rideStarted ? "#fff" : styles.value.color,
            }}
            onClick={(event) => {
              event.stopPropagation();
              try {
                window.localStorage.removeItem("rideStepStates");
                window.localStorage.removeItem("rideActiveIndex");
                window.localStorage.removeItem("rideOfferAmount");
                window.localStorage.removeItem("rideOfferConfirmed");
              } catch { /* empty */ }
              navigate(ROUTES.HOME);
            }}
          >
            {rideStarted ? "Cancel Trip" : "Cancel Ride"}
          </Box>
        </Box>

        <motion.div style={styles.body} variants={bodyVariants} initial={false} animate={isOpen ? "open" : "closed"} onClick={(event) => event.stopPropagation()} >
          <Box style={styles.blurOverlay} />
          <Box style={styles.content}>
            <Navigator isVisible={isOpen} />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Main;