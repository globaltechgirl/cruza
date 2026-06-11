import { FC, useEffect, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import MapImage from "@/assets/map.jpg";
import Logo from "@/assets/logo.svg?react";
import Register from "./auth/register"; 

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


interface OverviewProps {
  isVisible?: boolean;
}

const Overview: FC<OverviewProps> = ({ isVisible = true }) => {
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRegister(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
    map: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${MapImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 0,
    },
    gradient: {
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
    blur: {
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      maskImage: `linear-gradient(to bottom, transparent 0%, black 0%, black 100%)`,
      WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 0%, black 100%)`,
      background: `linear-gradient( to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.15) 100%)`,
      zIndex: 0,
    },
    splashs: {
      position: "absolute",
      inset: 0,                
      zIndex: 10,
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",   
      pointerEvents: "none",
    },
    splash: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10
    },
    logo: {
      width: 38,
      height: 38,
      borderRadius: 10, 
    },
    title: {
      fontSize: 28,
      fontWeight: 600,
      color: "var(--dark-100)",
      textTransform: "uppercase",
    },
    register: {
      position: "absolute",
      inset: 0,
      zIndex: 11,
      width: "100%",
      height: "100%",
    }
  } as const;

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.map} />
      <Box style={styles.gradient} />
      <Box style={styles.noise} />
      <Box style={styles.blur} />

      <AnimatePresence mode="wait">
        {!showRegister ? (
          <div key="splash" style={styles.splashs}>
            <motion.div
              key="splash"
              style={styles.splash}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } }}
              transition={{ duration: 0.5 }}
              variants={itemVariants}
            >
              <Logo style={styles.logo} />
              <Text style={styles.title}>Cruza</Text>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="register"
            style={styles.register}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Register isVisible={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Overview;