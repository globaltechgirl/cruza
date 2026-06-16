import { FC, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import ProfileImg from "@/assets/user.jpg";
import StarIcon from "@/assets/icons/star";
import CashIcon from "@/assets/icons/cash";
import ClockIcon from "@/assets/icons/clock";
import CheckIcon from "@/assets/icons/checks";

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },

  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
    },
  },
};

interface OffersProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const Offers: FC<OffersProps> = ({ isVisible = true, onClose }) => {
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
    main: {
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
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 10,
      width: "100%",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 15,
      width: "100%",
      maxHeight: "calc(var(--vh) * 100 - 120px)",
      overflowY: "auto",
      position: "relative",
      zIndex: 1,
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      width: "100%",
    },
    cards: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      padding: 2,
    },
    card: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: "6px 14px 6px 6px",
      borderRadius: 10,
      backgroundColor: "var(--light-200)",
      gap: 10,
    },
    content: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    right: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 1,
      borderRadius: 8,
      width: "100%",
    },
    initials: {
      width: 56,
      height: 56,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--light-200)",
      borderRadius: 12,
      padding: 2,
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
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
    top: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    spans: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      color: "var(--yellow-300)",
    },
    star: {
      width: 13,
      height: 13,
    },
    span: {
      fontSize: 13,
      fontWeight: 500,
      textTransform: "lowercase",
    },
    text: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    navigate: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      overflow: "hidden",
    },
    infos: {
      backgroundColor: "var(--light-100)",
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexShrink: 0,
      padding: "2px 8px",
      width: "fit-content",
    },
    info: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    iconb: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
  } as const;

  const navigate = useNavigate();
  type ActivityStatus = "confirmed" | "rejected" | null;

  interface Activity {
    id: number;
    image: string;
    name: string;
    car: string;
    rating: string;
    money: string;
    time: string;
    status: ActivityStatus;
  }

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, image: ProfileImg, name: "John Doe", car: "Toyota Avensis", rating: "4.73", money: "7,000", time: "1 min", status: null },
    { id: 2, image: ProfileImg, name: "Sarah James", car: "Honda Civic", rating: "4.90", money: "5,500", time: "2 min", status: null },
    { id: 3, image: ProfileImg, name: "Michael Ray", car: "Toyota Corolla", rating: "4.81", money: "8,200", time: "3 min", status: null },
    { id: 4, image: ProfileImg, name: "Daniel Cole", car: "Lexus RX", rating: "4.68", money: "10,000", time: "4 min", status: null },
  ]);

  const handleStatus = (id: number, status: "confirmed" | "rejected") => {
    setActivities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    if (status === "confirmed") {
      localStorage.setItem("rideOfferConfirmed", "true");
      localStorage.setItem("rideOfferRejected", "false");

      const stored = JSON.parse(localStorage.getItem("rideStepStates") || "{}");
      stored.offerConfirmed = true;
      stored.offerComplete = true;
      localStorage.setItem("rideActiveIndex", String(4));
      localStorage.setItem("rideStepStates", JSON.stringify(stored));

      setTimeout(() => {
        setActivities((prev) => prev.filter((item) => item.id !== id));
        navigate(ROUTES.RIDE);
      }, 600);
    }

    if (status === "rejected") {
      localStorage.setItem("rideOfferRejected", "true");
      localStorage.setItem("rideOfferConfirmed", "false");

      const stored = JSON.parse(localStorage.getItem("rideStepStates") || "{}");
      stored.offerConfirmed = false;
      stored.offerComplete = true;
      localStorage.setItem("rideActiveIndex", String(4));
      localStorage.setItem("rideStepStates", JSON.stringify(stored));

      setTimeout(() => {
        setActivities((prev) => prev.filter((item) => item.id !== id));
        // navigate back to the ride view and let the navigator pick up the active index
        navigate(ROUTES.RIDE);
      }, 600);
    }
  };

  const handleClose = () => {
    const rejected = localStorage.getItem("rideOfferRejected");

    if (rejected !== "true") {
      localStorage.removeItem("rideStepStates");
      localStorage.removeItem("rideOfferAmount");
    }

    localStorage.removeItem("rideOfferConfirmed");

    if (onClose) onClose();

    navigate(ROUTES.RIDE);
  };

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noise} />

      <motion.div style={styles.main} variants={itemVariants}>
        <Box style={styles.icons} onClick={handleClose}>
          <IconX style={styles.icon} />
        </Box>
      </motion.div>

      <motion.div style={styles.body} variants={itemVariants}>
        <Box style={styles.column}>
          <AnimatePresence>
            {activities.map((item) => {
              return (
                <motion.div key={item.id} variants={cardVariants} initial="hidden" animate="visible" exit="exit" style={styles.cards}>
                  <Box style={styles.card}>
                    <Box style={styles.content}>
                      <Box style={styles.initials}>
                        <img src={item.image} alt="Profile Img" style={styles.initial}  />
                      </Box>

                      <Box style={styles.right}>
                        <Box style={styles.top}>
                          <Text style={styles.title}>{item.name}</Text>

                          <Box style={styles.spans}>
                            <StarIcon style={styles.star} />
                            <Text style={styles.span}>{item.rating}</Text>
                          </Box>
                        </Box>

                        <Text style={styles.text}>{item.car}</Text>
                      </Box>
                    </Box>

                    <Box style={styles.navigate}>
                      <Box style={styles.infos}>
                        <CashIcon style={styles.iconb} />
                        <Text style={styles.info}>{item.money}</Text>
                      </Box>

                      <Box style={styles.infos}>
                        <ClockIcon style={styles.iconb} />
                        <Text style={styles.info}>{item.time}</Text>
                      </Box>

                      <Box
                        style={{
                          ...styles.infos,
                          cursor: "pointer",
                          backgroundColor: item.status === "confirmed" ? "var(--green-100)" : "var(--light-100)",
                        }}
                        onClick={() => handleStatus(item.id, "confirmed")}
                      >
                        <CheckIcon style={{ ...styles.iconb, color: item.status === "confirmed" ? "var(--green-300)" : "var(--green-300)", }} />

                        <Text style={{ ...styles.info, color: item.status === "confirmed" ? "var(--green-300)" : "var(--green-300)", }}>
                          {item.status === "confirmed" ? "Confirmed" : "Confirm"}
                        </Text>
                      </Box>

                      <Box
                        style={{
                          ...styles.infos,
                          cursor: "pointer",
                          backgroundColor: item.status === "rejected" ? "var(--red-100)" : "var(--light-100)",
                        }}
                        onClick={() => handleStatus(item.id, "rejected")}
                      >
                        <CheckIcon style={{ ...styles.iconb, color: item.status === "rejected" ? "var(--red-300)" : "var(--red-300)", }} />

                        <Text style={{ ...styles.info, color: item.status === "rejected" ? "var(--red-300)" : "var(--red-300)", }}>
                          {item.status === "rejected" ? "Rejected" : "Reject"}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Offers;