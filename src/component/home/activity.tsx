import { FC } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import ProfileImg from "@/assets/user.jpg";
import SparkIcon from "@/assets/icons/spark";

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

const topSpansVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
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
      gap: 15,
    },
    initials: {
      width: 65,
      height: 65,
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
      fontSize: 14,
      fontWeight: 500,
      color: "var(--dark-100)",
      textTransform: "capitalize"
    },
    subtitle: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase"
    },
    spans: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
      width: "100%",
      marginTop: 3,
    },
    span: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      gap: 6,
    },
    value: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    label: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "capitalize",
      marginBottom: 1.5,
    },
    middle: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 10,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      marginTop: 10,
    },
    box: {
      width: "100%",
      borderRadius: 8,
      padding: 10,
      background: "rgba(255, 255, 255, 0.15)",
      display: "flex",
      flexDirection: "column",
      gap: 15,
    },
    top: {
      display: "flex",
      alignItems: "center",
      gap: 8,
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
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    bars: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      width: "100%",
    },
    fill: {
      flex: 1,
      height: 8,
      borderRadius: 8,
      backgroundColor: "color-mix(in srgb, var(--dark-400) 40%, transparent)",
    },
    filled: {
      flex: 1,
      height: 8,
      borderRadius: 8,
      backgroundColor: "var(--dark-200)",
    },
    info: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.4,
    },
  } as const;

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={styles.initials} variants={itemVariants}>
        <img src={ProfileImg} alt="Profile Img" style={styles.initial} />
      </motion.div>

      <motion.div style={styles.titles} variants={itemVariants}>
        <Text style={styles.title}>Daniel Smith</Text>
        <Text style={styles.subtitle}>Babcock University</Text>
      </motion.div>

      <motion.div style={styles.spans} variants={topSpansVariants}>
        <motion.div style={styles.span} variants={itemVariants}>
          <Text style={styles.value}>100</Text>
          <Text style={styles.label}>Reviews</Text>
        </motion.div>
        <motion.div style={styles.span} variants={itemVariants}>
          <Text style={styles.value}>1582</Text>
          <Text style={styles.label}>Rides</Text>
        </motion.div>
        <motion.div style={styles.span} variants={itemVariants}>
          <Text style={styles.value}>2</Text>
          <Text style={styles.label}>Vehicles</Text>
        </motion.div>
      </motion.div>

      <motion.div style={styles.middle} variants={itemVariants}>
        <Box style={styles.box}>
          <Box style={styles.top}>
            <Box style={styles.icons}>
              <SparkIcon style={styles.icon} />
            </Box>

            <Text style={styles.text}>Weekly Ride Activity</Text>
          </Box>

          <Box style={styles.bars}>
            <Box style={styles.filled} />
            <Box style={styles.filled} />
            <Box style={styles.filled} />
            <Box style={styles.filled} />
            <Box style={styles.filled} />
            <Box style={styles.filled} />
            <Box style={styles.fill} />
            <Box style={styles.fill} />
            <Box style={styles.fill} />
          </Box>

          <Text style={styles.info}>
            You have completed 75% of your weekly ride activity!
          </Text>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Activity;