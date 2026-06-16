import { FC } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import MapIcon from "@/assets/icons/map";
import MoneyIcon from "@/assets/icons/money";
import BellIcon from "@/assets/icons/bell";

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

interface ActivityProps {
  isVisible?: boolean;
}

const Activity: FC<ActivityProps> = ({ isVisible = true }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    cards1: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      padding: 2,
    },
    card1: {
      width: "100%",
      padding: 10,
      borderRadius: 10,
      backgroundColor: "var(--light-200)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    top: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    flex: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    icons: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    icon: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    text: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    info: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.4,
    },
    span: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      borderRadius: 6,
      backgroundColor: "var(--light-100)",
      width: "fit-content",
      padding: "2px 6px"
    },
    header: {
      fontSize: 12.5,
      fontWeight: 550,
      color: "var(--dark-100)",
      textTransform: "capitalize",
      marginTop: 6,
      marginLeft: 2
    },
    cards2: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      padding: 2,
      cursor: "pointer",
    },
    card2: {
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

  const navigate = useNavigate();

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

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={styles.cards1} onClick={() => navigate(ROUTES.BOOKING)} variants={itemVariants}>
        <Box style={styles.card1}>
          <Box style={styles.top}>
            <Box style={styles.flex}>
              <Box style={styles.icons}>
                <BellIcon style={styles.icon} />
              </Box>

              <Text style={styles.text}>Reminders</Text>
            </Box>

            <Box style={styles.span}>09:00 AM</Box>
          </Box>

          <Text style={styles.info}>You have a ride in 15 minutes!</Text>
        </Box>
      </motion.div>

      <motion.div style={styles.header}>Recent Activity</motion.div>

      {activities.map((item, index) => {
        return (
          <motion.div key={index} style={styles.cards2} variants={itemVariants}>
            <Box style={styles.card2}>
              <Box style={styles.circles}>{item.icon}</Box>

              <Box style={styles.titles}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.date}</Text>
              </Box>
            </Box>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Activity;
