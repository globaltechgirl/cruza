import { FC, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import StarIcon from "@/assets/icons/star";

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

interface RatingProps {
  isVisible?: boolean;
  onStateChange?: (isComplete: boolean) => void;
}

const Rating: FC<RatingProps> = ({ isVisible = true, onStateChange }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      gap: 15,
    },
    main: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 10,
    },
    text: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    input: {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      padding: 0,
    },
    span: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    icons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    icon: {
      width: 16,
      height: 16,
      color: "var(--dark-200)",
      cursor: "pointer",
    },
  } as const;

  const [isEditingRating, setIsEditingRating] = useState(false);
  const [rating, setRating] = useState("");
  const [ratings, setRatings] = useState<number>(0);

  useEffect(() => {
    if (onStateChange) {
      const isComplete = ratings >= 1;
      onStateChange(isComplete);
    }
  }, [rating, ratings, onStateChange]);

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={{ ...styles.main, marginRight: "auto" }} variants={itemVariants}>
        {isEditingRating ? (
          <input
            style={styles.input}
            value={rating}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRating(event.currentTarget.value)}
            onBlur={() => setIsEditingRating(false)}
            placeholder="Write a review"
          />
        ) : (
          <Text style={styles.text} onClick={() => setIsEditingRating(true)}>
            {rating || "Write a review"}
          </Text>
        )}
      </motion.div>

      <motion.div style={styles.main} variants={itemVariants}>
        <Text style={styles.span}>Tap to rate</Text>
        <Text style={styles.span}>-</Text>
        <Box style={styles.icons}>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              style={{ ...styles.icon, color: star <= ratings ? "var(--dark-200)" : "var(--dark-300)", }}
              onClick={() => setRatings(star)}
            />
          ))}
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Rating;