import { FC, useEffect, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import ProfileImg from "@/assets/user.jpg";
import StarIcon from "@/assets/icons/star";
import CarIcon from "@/assets/icons/car";
import { IconCircleFilled } from "@tabler/icons-react";
import { ROUTES } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import ChatsIcon from "@/assets/icons/chats";

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

interface JourneyProps {
  isVisible?: boolean;
  onStateChange?: (isComplete: boolean) => void;
}

const Journey: FC<JourneyProps> = ({ isVisible = true, onStateChange }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [iconReached, setIconReached] = useState(false);
  const [rideStatus, setRideStatus] = useState("started");
  
  useEffect(() => {
    const stored = localStorage.getItem("rideStepStates");

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      if (parsed.rideStatus) {
        setRideStatus(parsed.rideStatus);
      }

      if (typeof parsed.rideProgress === "number") {
        setProgress(parsed.rideProgress);
      }

      if (parsed.rideArrived) {
        setIconReached(true);
        setProgress(1);
        setRideStatus("ended");
      }
    } catch (e) {
      console.warn("Invalid rideStepStates", e);
    }
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("rideStepStates") || "{}");

    stored.rideStatus = rideStatus;
    localStorage.setItem("rideStepStates", JSON.stringify(stored));
  }, [rideStatus]);

  useEffect(() => {
    const fromChat = localStorage.getItem("returnFromChat");

    if (fromChat) {
      const stored = localStorage.getItem("rideStepStates");

      if (stored) {
        const parsed = JSON.parse(stored);

        setRideStatus(parsed.rideStatus || "started");

        if (parsed.rideArrived) {
          setIconReached(true);
          setProgress(1);
        } else if (parsed.rideProgress) {
          setProgress(parsed.rideProgress);
        }
      }

      localStorage.removeItem("returnFromChat");
    }
  }, []);

  const barRef = useRef<HTMLDivElement | null>(null);
  const [barWidth, setBarWidth] = useState(0);
  const iconSize = 10;

  useEffect(() => {
    if (!barRef.current) return;

    const updateWidth = () => { setBarWidth(barRef.current!.offsetWidth); };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (onStateChange) {
      const isArrived = iconReached && rideStatus === "ended";
      onStateChange(isArrived);
    }
  }, [iconReached, rideStatus, onStateChange]);

  useEffect(() => {
    if (!barWidth || iconReached) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.01;

        const stored = JSON.parse(localStorage.getItem("rideStepStates") || "{}");
        stored.rideProgress = next;
        localStorage.setItem("rideStepStates", JSON.stringify(stored));

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

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      gap: 15,
    },
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 15,
    },
    flex: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    time: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    scroll: {
      position: "relative",
      height: 6,
      backgroundImage: "repeating-linear-gradient(-45deg, var(--light-200) 0, var(--light-200) 4px, var(--dark-400) 4px, var(--dark-400) 7px)",
      borderRadius: 6,
      border: "1px dashed var(--dark-400)",
      width: "100%",
    },
    icons1: {
      position: "absolute",
      top: -4,
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
      top: -3,
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
    body: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    left: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    initials: {
      width: 46,
      height: 46,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: 12,
      padding: 2,
      display: "flex",
      alignItems: "center",
    },
    initial: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "cover",
      objectPosition: "top",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 1,
    },
    spans: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      color: "var(--yellow-300)",
    },
    icon: {
      width: 12,
      height: 12,
    },
    span: {
      fontSize: 12,
      fontWeight: 500,
      textTransform: "lowercase",
    },
    rights: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    right: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
  } as const;

  const statusMessages = {
    started: {
      status: "On the way",
    },
    ongoing: {
      status: "Almost there",
    },
    ended: {
      status: "Ride arrived",
    },
  };

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={styles.main} variants={itemVariants}>
        <Box style={styles.flex}>
          <Text style={styles.text}>{statusMessages[rideStatus as keyof typeof statusMessages].status}</Text>
          <Text style={styles.time}>9:45 AM</Text>
        </Box>

        <Box ref={barRef} style={styles.scroll}>
          {!iconReached && (
            <Box style={styles.icons1}><CarIcon style={styles.icon1} /></Box>
          )}

          {!iconReached && (
            <Box style={styles.icons2}><IconCircleFilled style={styles.icon2} /></Box>
          )}

          {iconReached && (
            <Box style={styles.icons1}><CarIcon style={styles.icon1} /></Box>
          )}
        </Box>
      </motion.div>

      <motion.div style={styles.body} variants={itemVariants}>
        <Box style={styles.left}>
          <Box style={styles.initials}>
            <img src={ProfileImg} alt="Profile Img" style={styles.initial} />
          </Box>

          <Box style={styles.column}>
            <Text style={styles.text}>John Doe</Text>
            <Box style={styles.spans}>
              <StarIcon style={styles.icon} />
              <Text style={styles.span}>Top Rated</Text>
            </Box>
          </Box>
        </Box>

        <Box style={styles.rights}>
          <ChatsIcon
            style={styles.right}
            onClick={() => { localStorage.setItem("returnFromChat", "true"); navigate(ROUTES.CHAT); }}
          />
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Journey;