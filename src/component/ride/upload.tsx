import { FC, useRef, useState, useEffect } from "react";
import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import AddIcon from "@/assets/icons/add";

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

const initialsVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 20,
    rotate: index % 2 === 0 ? -20 : 20,
    scale: 0.8,
  }),

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotate: index % 2 === 0 ? -8 : 8,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.08,
    },
  }),
};

interface UploadProps {
  isVisible?: boolean;
  onStateChange?: (isComplete: boolean) => void;
}

const Upload: FC<UploadProps> = ({ isVisible = true, onStateChange }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
    },
    main: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    initials: {
      width: 66,
      height: 66,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: 12,
      padding: 2,
      display: "flex",
      alignItems: "center",
      marginLeft: -10,
      cursor: "pointer",
      overflow: "hidden",
    },
    initial: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    icon: {
      width: 35,
      height: 35,
      color: "var(--dark-200)",
    },
    initials1: {
      marginLeft: 0,
      transform: "rotate(-10deg)",
      zIndex: 1,
    },
    initials2: {
      transform: "rotate(6deg)",
      zIndex: 2,
    },
    initials3: {
      transform: "rotate(-5deg)",
      zIndex: 3,
    },
    initials4: {
      transform: "rotate(12deg)",
      zIndex: 4,
    },
  } as const;

  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (onStateChange) {
      const hasAtLeastOneImage = images.some((img) => img !== null);
      onStateChange(hasAtLeastOneImage);
    }
  }, [images, onStateChange]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImages((previous) => {
      const updated = [...previous];
      updated[index] = imageUrl;
      return updated;
    });
  };

  const rotations = [
    styles.initials1,
    styles.initials2,
    styles.initials3,
    styles.initials4,
  ];

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={styles.main} variants={itemVariants}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={initialsVariants}
            initial="hidden"
            animate="visible"
            style={{ ...styles.initials, ...rotations[index] }}
            onClick={() => inputRefs.current[index]?.click()}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={(element) => { inputRefs.current[index] = element }}
              onChange={(event) => handleImageChange(event, index)}
            />

            <Box style={styles.initial}>
              {image ? (
                <img src={image} alt="upload" style={styles.image} />
              ) : (
                <AddIcon style={styles.icon} />
              )}
            </Box>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Upload;