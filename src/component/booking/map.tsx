import { FC, useEffect, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { IconCircleFilled, IconX } from "@tabler/icons-react";
import ProfileImg from "@/assets/user.jpg";
import MapImage from "@/assets/map.jpg";
import CarIcon from "@/assets/icons/car";
import StarIcon from "@/assets/icons/star";
import CaptureIcon from "@/assets/icons/capture";

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
  onClose: () => void;
};

const Map: FC<Props> = ({ isVisible = true, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [iconReached, setIconReached] = useState(false);
  const [rideStatus, setRideStatus] = useState("started");

  const barRef = useRef<HTMLDivElement | null>(null);
  const [barWidth, setBarWidth] = useState(0);
  const iconSize = 10; 

  const [isMapExpanded, setIsMapExpanded] = useState(false);

  useEffect(() => {
    if (!barRef.current) return;

    const updateWidth = () => {
      setBarWidth(barRef.current!.offsetWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!barWidth || iconReached) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.01; 

        if (next < 0.4) {
          setRideStatus("started");
        } else if (next < 0.8) {
          setRideStatus("ongoing");
        } else {
          setRideStatus("ended");
        }

        if (next >= 1) {
          setIconReached(true);
          return 1;
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [barWidth, iconReached]);

  const iconPos = progress * (barWidth - iconSize);

  const [ rating ] = useState(4);

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => {
      const filled = i < rating;

      return (
        <StarIcon
          key={i}
          style={filled ? styles.reviews : styles.review}
        />
      );
    });
  };

  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      overflow: "hidden",
      position: "relative",
      background:
        "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
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
    body: {
      display: "flex",
      flexDirection: "column",
      gap: 30,
      padding: 15,
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative",
      zIndex: 1,
    },
    top: {
      width: "100%",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
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
    middle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      width: "100%"
    },
    initials: {
      position: "relative",
      width: 56,
      height: 56,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 2,
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
    },
    initial: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "cover",
      objectPosition: "top",
    },
    titles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    },
    title: {
      fontSize: 15,
      fontWeight: 500,
      color: "var(--dark-100)",
      textTransform: "capitalize",
    },
    subtitle: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    scroller: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      width: "90%"
    },
    scroll: {
      position: "relative",
      height: 8,
      backgroundImage: "repeating-linear-gradient(-45deg, var(--light-200) 0, var(--light-200) 4px, var(--dark-400) 4px, var(--dark-400) 7px)",
      borderRadius: 6,
      border: "1px dashed var(--dark-400)",
      width: "100%",
      marginTop: 5
    },
    icons1: {
      position: "absolute",
      top: -3.5,
      left: -10,
      width: 20,
      height: 12,
      border: "1px solid var(--dark-400)",
      backgroundColor: "var(--light-100)",
      borderRadius: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 0.1s linear",
      transform: `translateX(${iconPos}px)`,
      zIndex: 2,
    },
    icon1: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    icons2: {
      position: "absolute",
      top: -2.5,
      right: -2,
      width: 11,
      height: 11,
      border: "1px solid var(--dark-400)",
      backgroundColor: "var(--light-100)",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    icon2: {
      width: 11,
      height: 11,
      color: "var(--dark-300)",
    },
    spans: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    span: {
      color: "var(--dark-100)",
    },
    bottom: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
    },
    maps: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "relative",
    },
    map: {
      width: "100%",
      height: 300,
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 10,
    },
    capture: {
      position: "absolute", 
      bottom: 10,           
      right: 10,  
    },
    wrapper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    box: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      gap: 6,
      padding: 10,
      borderRadius: 10,
      background: "rgba(255, 255, 255, 0.15)",
    },
    reviews: { 
      width: 16,
      height: 16,
      color: "var(--dark-200)",
      cursor: "pointer",
    },
    review: { 
      width: 14,
      height: 14,
      color: "color-mix(in srgb, var(--dark-400) 40%, transparent)",
    },
    text: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.6,
      textAlign: "justify"
    },
    overlays: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
    close: {
      position: "absolute",
      top: 15,
      right: 15,
    },
    overlay: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 12,
    },
  } as const;

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>
      
      <Box style={styles.noise} />

      <Box style={styles.body}>
        <motion.div style={styles.top} variants={itemVariants}>
          <Box style={styles.icons} onClick={onClose}>
            <IconX style={styles.icon}  />
          </Box>
        </motion.div>

        <Box style={styles.middle}>
          <motion.div style={styles.initials} variants={itemVariants}>
            <img src={ProfileImg} alt="Profile Img" style={styles.initial} />
          </motion.div>

          <motion.div style={styles.titles} variants={itemVariants}>
            <Text style={styles.title}>Christopher Amah</Text>
            <Text style={styles.subtitle}>location - Babcock University</Text>
          </motion.div>

          <Box style={styles.scroller}>
            <motion.div ref={barRef} style={styles.scroll} variants={itemVariants}>
              {!iconReached && (
                <Box style={styles.icons1}>
                  <CarIcon style={styles.icon1} />
                </Box>
              )}

              {!iconReached && (
                <Box style={styles.icons2}>
                  <IconCircleFilled style={styles.icon2} />
                </Box>
              )}

              {iconReached && (
                <Box style={styles.icons1}>
                  <CarIcon style={styles.icon1} />
                </Box>
              )}
            </motion.div>

            <motion.div style={styles.spans} variants={itemVariants}>
              {rideStatus === "started" && (
                <>
                  Driver has <span style={styles.span}>arrived</span>
                </>
              )}

              {rideStatus === "ongoing" && (
                <>
                  Arrives in <span style={styles.span}>54 mins</span>
                </>
              )}

              {rideStatus === "ended" && (
                <>
                  Ride has <span style={styles.span}>ended</span>
                </>
              )}
            </motion.div>
          </Box>
        </Box>
        
        <Box style={styles.bottom}>
          <motion.div style={styles.maps} variants={itemVariants}>
            <img src={MapImage} alt="map" style={styles.map} />
            <Box style={{ ...styles.icons, ...styles.capture }} onClick={() => setIsMapExpanded(true)}>
              <CaptureIcon style={styles.icon} />
            </Box>
          </motion.div>

          <motion.div style={styles.wrapper} variants={itemVariants}>
            <Box style={styles.box}>{renderStars()}</Box>
          </motion.div>

          <motion.div style={styles.wrapper} variants={itemVariants}>
            <Box style={styles.box}>
              <Text style={styles.text}>
                Excellent service! The driver was on time, helped with our luggage, and possessed great communication skills. Highly professional and polite.
              </Text>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {isMapExpanded && (
        <Box style={styles.overlays}>
          <Box style={{ ...styles.icons, ...styles.close}} onClick={() => setIsMapExpanded(false)}>
            <IconX style={styles.icon} />
          </Box>

          <img src={MapImage} style={styles.overlay} />
        </Box>
      )}
    </motion.div>
  );
};

export default Map;