import { FC, useState, useRef, useEffect } from "react";
import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import BagIcon from "@/assets/icons/bag";
import CheckIcon from "@/assets/icons/checks";
import Bag1 from "@/assets/bag1.jpg";
import Bag2 from "@/assets/bag2.jpg";
import Bag3 from "@/assets/bag3.jpg";

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

const Camera: FC<Props> = ({ isVisible = true }) => {
  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      borderRadius: "14px 14px 0 0",
      border: "1px solid var(--light-100)",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      gap: 15,
      padding: "25px 15px 15px 15px",
      overflowY: "auto",      
      scrollbarWidth: "none",   
      msOverflowStyle: "none",
      overflow: "hidden",
      position: "relative",
      background: "linear-gradient(135deg, var(--light-100) 0%, var(--light-100) 50%, var(--light-100) 100%)",
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
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 20,
      paddingTop: 20,
    },
    lines: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    },
    icons: {
      background: "rgba(255, 255, 255, 0.55)",
      border: "1px dashed var(--dark-300)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "50%",
      width: 22,
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    line: {
      width: 1,
      borderLeft: "1px dashed var(--dark-400)",
    },
    side: {
      display: "flex",
      flexDirection: "column",
      gap: 40,
    },
    stack: {
      position: "relative",
      width: 280,
      height: 220,
      cursor: "pointer",
      marginTop: 5,
      flexShrink: 0,
    },
    images1: {
      position: "absolute",
      top: 0,
      left: "0%",
      width: 180,
      height: 220,
      transform: "rotate(-2deg)",
      zIndex: 3,
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    images2: {
      position: "absolute",
      top: 0,
      left: 50, 
      width: 180,
      height: 220,
      transform: "rotate(2deg)",
      zIndex: 2,
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    images3: {
      position: "absolute",
      top: 5,
      left: 90, 
      width: 180,
      height: 220,
      transform: "rotate(5deg)",
      zIndex: 1,
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 10,
    },
    approve: {
      padding: "2px 8px",
      background: "rgba(229, 228, 226)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--dark-400)",
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      cursor: "pointer",
      width: "fit-content",
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
      overflow: "hidden",
      border: "1px solid var(--light-100)",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    overlay: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    close: {
      position: "absolute",
      top: 15,
      right: 15,
    },
    left: {
      position: "absolute",
      left: 10,
    },
    right: {
      position: "absolute",
      right: 10,
    },
  } as const;

  const images = [Bag1, Bag2, Bag3];

  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openViewer = (index: number) => {
    setCurrentImage(index);
    setViewerOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const lugRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLDivElement>(null);

  const [heights, setHeights] = useState({
    lug: 0,
    approve: 0,
  });

  useEffect(() => {
    setHeights({
      lug: lugRef.current?.offsetHeight || 0,
      approve: approveRef.current?.offsetHeight || 0,
    });
  }, []);

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noise} />
      
      <Box style={styles.body}>
        <Box style={styles.lines}>
          <motion.div style={styles.icons} variants={itemVariants}>
            <BagIcon style={styles.icon} />
          </motion.div>

          <Box style={{ ...styles.line, height: heights.lug + 12 }} />

          <motion.div style={styles.icons} variants={itemVariants}>
            <CheckIcon style={styles.icon} />
          </motion.div>
        </Box>

        <Box style={styles.side}>
          <Box
            ref={lugRef}
            style={styles.stack}
            onClick={(e) => { e.stopPropagation(); openViewer(0); }}
          >
            <motion.div style={styles.images1} variants={itemVariants}>
              <img src={Bag1} alt="Bag 1" style={styles.image} />
            </motion.div>
            <motion.div style={styles.images2} variants={itemVariants}>
              <img src={Bag2} alt="Bag 2" style={styles.image} />
            </motion.div>
            <motion.div style={styles.images3} variants={itemVariants}>
              <img src={Bag3} alt="Bag 3" style={styles.image} />
            </motion.div>
          </Box>

          <motion.div ref={approveRef} style={styles.approve} variants={itemVariants}>Approve Luggage</motion.div>
        </Box>
      </Box>

      {viewerOpen && (
        <Box style={styles.overlays}>
          <Box style={{ ...styles.icons, ...styles.close }} onClick={() => setViewerOpen(false)}>
            <IconX style={styles.icon} />
          </Box>

          <Box style={{ ...styles.icons, ...styles.left }} onClick={prevImage}>
            <IconChevronLeft style={styles.icon} />
          </Box>

          <img src={images[currentImage]} alt="Preview" style={styles.overlay} />

          <Box style={{ ...styles.icons, ...styles.right }} onClick={nextImage}>
            <IconChevronRight style={styles.icon} />
          </Box>
        </Box>
      )}
    </motion.div>
  );
};

export default Camera;