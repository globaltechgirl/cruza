import { FC, useCallback, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import Scheduler from "./scheduler";

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

interface ScheduleProps {
  isVisible?: boolean;
  pickupDate?: Date | null;
  onPickupDateChange?: (date: Date) => void;
  onStateChange?: (isComplete: boolean) => void;
}

const Schedule: FC<ScheduleProps> = ({ isVisible = true, pickupDate: externalPickupDate = null, onPickupDateChange, onStateChange }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      overflow: "hidden",
    },
    main: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
    },
    title: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    time: {
      fontSize: 15,
      fontWeight: 500,
      color: "var(--dark-200)",
      fontFamily: "Ticketing",
      cursor: "pointer",
    },
    input: {
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 15,
      fontWeight: 500,
      color: "var(--dark-200)",
      fontFamily: "Ticketing",
      padding: 0,
      textAlign: "center",
    },
  } as const;

  const [showPicker, setShowPicker] = useState(false);
  const pickupDate = externalPickupDate;

  useEffect(() => {
    if (onStateChange) {
      onStateChange(!!pickupDate);
    }
  }, [pickupDate, onStateChange]);

  const formatPickupDate = (value: Date | null) => {
    const date = value ?? new Date(); 

    try {
      const formatted =
        date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }) +
        " • " +
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

      return formatted;
    } catch {
      return "";
    }
  };

  const handleChange = useCallback(
    (value: string) => {
      const date = new Date(value);

      if (!isNaN(date.getTime())) {
        if (onPickupDateChange) { onPickupDateChange(date) }
      }

      setShowPicker(false);
    },
    [onPickupDateChange],
  );

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      {showPicker ? (
        <Scheduler key="scheduler" onChange={handleChange} />
      ) : (
        <Box style={styles.main}>
          <Text style={styles.title}>Schedule pickup time</Text>
          <Box style={styles.time} onClick={() => setShowPicker(true)}>
            {formatPickupDate(pickupDate)}
          </Box>
        </Box>
      )}
    </motion.div>
  );
};

export default Schedule;