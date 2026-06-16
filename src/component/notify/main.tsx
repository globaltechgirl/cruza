import { FC } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import MapIcon from "@/assets/icons/map";
import MoneyIcon from "@/assets/icons/money";
import { IconX } from "@tabler/icons-react";

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

interface MainProps {
  isVisible?: boolean;
}

const Main: FC<MainProps> = ({ isVisible = true }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "20px 15px",
      gap: 15,
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
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 12,
      width: "100%",
      height: "100%",
      position: "relative",
      zIndex: 1,
    },
    cards: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      padding: 2,
      cursor: "pointer",
    },
    card: {
      width: "100%",
      padding: "6px 14px 6px 6px",
      borderRadius: 10,
      backgroundColor: "var(--light-200)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    circles: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: "var(--light-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    circle: {
      width: 20,
      height: 20,
      color: "var(--dark-200)",
    },
    titles: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      flex: 1,
    },
    title: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    subtitle: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
  } as const;

  const activities = [
    {
      icon: <MapIcon style={styles.circle} />,
      title: "Ride to Victoria Island",
      date: "24.04.26",
    },
    {
      icon: <MoneyIcon style={styles.circle} />,
      title: "Ride Payment Received",
      date: "23.04.26",
    },
    {
      icon: <MapIcon style={styles.circle} />,
      title: "Ride to Lekki Phase 1",
      date: "22.04.26",
    },
    {
      icon: <MoneyIcon style={styles.circle} />,
      title: "Ride Payment Received",
      date: "21.04.26",
    },
    {
      icon: <MapIcon style={styles.circle} />,
      title: "Ride to Yaba",
      date: "20.04.26",
    },
  ];

  const navigate = useNavigate();

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noise} />

      <motion.div style={styles.top} variants={itemVariants}>
        <Box style={styles.icons} onClick={() => navigate(ROUTES.DRIVER)}>
          <IconX style={styles.icon}/>
        </Box>
      </motion.div>

      <Box style={styles.body}>
        {activities.map((item, index) => {
          return (
            <motion.div key={index} style={styles.cards} variants={itemVariants}>
              <Box style={styles.card}>
                <Box style={styles.circles}>{item.icon}</Box>

                <Box style={styles.titles}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.date}</Text>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </motion.div>
  );
};

export default Main;