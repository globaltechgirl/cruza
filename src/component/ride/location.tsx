import React, { FC, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import DotIcon from "@/assets/icons/dot";

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

interface LocationProps {
  isVisible?: boolean;
  onStateChange?: (isComplete: boolean) => void;
}

const Location: FC<LocationProps> = ({ isVisible = true, onStateChange }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
    },
    main: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      gap: 15,
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      flexShrink: 0,
    },
    line: {
      position: "absolute",
      top: 18,
      left: "50%",
      transform: "translateX(-50%)",
      width: 1,
      height: 26,
      border: "none",
      backgroundImage: "repeating-linear-gradient(to bottom, var(--dark-200) 0, var(--dark-200) 2px, transparent 2px, transparent 4px)",
      backgroundRepeat: "repeat-y",
      zIndex: 0,
    },
    icon: {
      width: 18,
      height: 18,
      zIndex: 1,
    },
    text: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      cursor: "pointer",
      flex: 1,
    },
    input: {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      padding: 0,
    },
  } as const;

  const [isEditingDropoff, setIsEditingDropoff] = useState(false);
  const [dropoff, setDropoff] = useState("");
  const [isEditingPickup, setIsEditingPickup] = useState(false);
  const [pickup, setPickup] = useState("");

  React.useEffect(() => {
    if (onStateChange) {
      onStateChange(!!dropoff && !!pickup);
    }
  }, [dropoff, pickup, onStateChange]);

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={{ ...styles.main, marginBottom: 25 }} variants={itemVariants}>
        <Box style={styles.column}>
          <DotIcon style={{ ...styles.icon, color: "var(--yellow-300)" }} />
          <Box style={styles.line}></Box>
        </Box>

        {isEditingDropoff ? (
          <input
            style={styles.input}
            value={dropoff}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDropoff(event.currentTarget.value)}
            onBlur={() => setIsEditingDropoff(false)}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter") { setIsEditingDropoff(false); }}}
            placeholder="Enter dropoff location"
            autoFocus
          />
        ) : (
          <Text style={styles.text} onClick={() => setIsEditingDropoff(true)}>
            {dropoff || "Enter dropoff location"}
          </Text>
        )}
      </motion.div>

      <motion.div style={styles.main} variants={itemVariants}>
        <DotIcon style={{ ...styles.icon, color: "var(--green-300)" }} />

        {isEditingPickup ? (
          <input
            style={styles.input}
            value={pickup}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPickup(event.currentTarget.value)}
            onBlur={() => setIsEditingPickup(false)}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter") { setIsEditingPickup(false); }}}
            placeholder="Enter pickup location"
            autoFocus
          />
        ) : (
          <Text style={styles.text} onClick={() => setIsEditingPickup(true)}>
            {pickup || "Enter pickup location"}
          </Text>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Location;