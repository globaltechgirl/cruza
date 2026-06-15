import { FC, useState, useEffect } from "react";
import { Box, Text, Loader } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
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

interface OfferProps {
  isVisible?: boolean;
  onStateChange?: (data: {
    isComplete: boolean;
    isConfirmed: boolean;
    amount: string;
  }) => void;
}

const Offer: FC<OfferProps> = ({ isVisible = true, onStateChange }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      gap: 15,
    },
    main: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    rows: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    title: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    row: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },
    icon: {
      width: 13,
      height: 13,
      color: "var(--dark-200)",
    },
    text: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    amount: {
      fontSize: 20,
      fontWeight: 600,
      color: "var(--dark-200)",
      cursor: "pointer",
    },
    input: {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 20,
      fontWeight: 600,
      color: "var(--dark-200)",
      padding: 0,
      margin: "0 auto",
      textAlign: "center",
    },
    icons: {
      width: 13,
      height: 13,
      color: "var(--dark-200)",
    },
    confirm: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "uppercase",
    },
  } as const;

  const navigate = useNavigate();
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [localIsConfirmed, setLocalIsConfirmed] = useState(false);
  const [offerConfirmed, setOfferConfirmed] = useState(false);
  const MIN_RECOMMENDED = 7000;

  useEffect(() => {
    const storedAmount = localStorage.getItem("rideOfferAmount");
    if (storedAmount) {
      setAmount(storedAmount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rideOfferAmount", amount);
  }, [amount]);

  useEffect(() => {
    if (!isVisible) return;

    const rejected = localStorage.getItem("rideOfferRejected");
    const stored = localStorage.getItem("rideStepStates");

    if (rejected === "true") {
      setOfferConfirmed(false);
      setLocalIsConfirmed(false);
      return;
    }

    try {
      if (stored) {
        const parsed = JSON.parse(stored);
        setOfferConfirmed(Boolean(parsed?.offerConfirmed));
      } else {
        setOfferConfirmed(false);
      }
    } catch {
      setOfferConfirmed(false);
    }

    const tempFlag = localStorage.getItem("rideOfferConfirmed");

    if (tempFlag) {
      setLocalIsConfirmed(true);
      localStorage.removeItem("rideOfferConfirmed");

      setTimeout(() => setLocalIsConfirmed(false), 2000);
    }
  }, [isVisible]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        isComplete: amount ? Number(amount) >= MIN_RECOMMENDED : false,
        isConfirmed: offerConfirmed,
        amount: amount,
      });
    }
  }, [amount, offerConfirmed, onStateChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const numbersOnly = value.replace(/\D/g, "");
    setAmount(numbersOnly);
  };

  const formatAmount = (value: string) => {
    if (!value) return "₦ 0.00";
    return `₦ ${Number(value).toLocaleString()}.00`;
  };

  const handleSubmit = () => {
    if (!amount) return;

    if (Number(amount) < MIN_RECOMMENDED) {
      return;
    }

    setLoading(true);
    setIsEditingAmount(false);

    try {
      const stored = localStorage.getItem("rideStepStates");
      const parsed = stored ? JSON.parse(stored) : {};
      parsed.offerConfirmed = true;
      parsed.offerComplete = true;
      localStorage.setItem("rideStepStates", JSON.stringify(parsed));
    } catch {
      void 0;
    }

    localStorage.setItem("rideOfferConfirmed", "true");
    navigate(ROUTES.OFFERS);
  };

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <motion.div style={styles.main} variants={itemVariants}>
        <Box style={styles.rows}>
          <Text style={styles.title}>Recommended - {MIN_RECOMMENDED}</Text>

          <Box style={styles.row}>
            <ClockIcon style={styles.icon} />
            <Text style={styles.text}>10 hrs</Text>
          </Box>
        </Box>
      </motion.div>

      <motion.div style={styles.main} variants={itemVariants}>
        {loading ? (
          <Loader size="16" color="var(--dark-200)" />
        ) : offerConfirmed || localIsConfirmed ? (
          <Box style={styles.row}>
            <CheckIcon style={styles.icons} />
            <Text style={styles.confirm}>Offer Confirmed</Text>
          </Box>
        ) : isEditingAmount ? (
          <input
            style={{
              ...styles.input,
              color: amount && Number(amount) < MIN_RECOMMENDED ? "var(--red-300)" : "var(--dark-200)",
            }}
            value={amount ? `₦ ${amount}` : "₦ "}
            onChange={handleChange}
            onFocus={(event) => { const length = event.currentTarget.value.length; event.currentTarget.setSelectionRange(length, length); }}
            onBlur={() => setIsEditingAmount(false)}
            onKeyDown={(event) => { if (event.key === "Enter") { handleSubmit(); }}}
            placeholder="₦ 00"
            autoFocus
          />
        ) : (
          <Text
            style={{
              ...styles.amount,
              color: amount && Number(amount) < MIN_RECOMMENDED ? "var(--red-300)" : styles.amount.color,
            }}
            onClick={() => setIsEditingAmount(true)}
          >
            {amount ? formatAmount(amount) : "₦ 0.00"}
          </Text>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Offer;