import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";

import MapIcon from "@/assets/icons/map";
import ClockIcon from "@/assets/icons/clock";
import CameraIcon from "@/assets/icons/camera";
import CashIcon from "@/assets/icons/cash";
import CarIcon from "@/assets/icons/car";
import CheckIcon from "@/assets/icons/checks";

import Location from "./location";
import Schedule from "./schedule";
import Upload from "./upload";
import Offer from "./offer";
import Journey from "./journey";
import Rating from "./rating";

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

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },

  exit: {
    opacity: 0,
    y: 30,
    scale: 0.92,

    transition: {
      duration: 0.2,
    },
  },
};

interface NavigateProps {
  isVisible?: boolean;
}

interface StepState {
  locationComplete: boolean;
  scheduleComplete: boolean;
  uploadComplete: boolean;
  offerComplete: boolean;
  offerConfirmed: boolean;
  rideArrived: boolean;
  ratingComplete: boolean;
}

const defaultStepState: StepState = {
  locationComplete: false,
  scheduleComplete: false,
  uploadComplete: false,
  offerComplete: false,
  offerConfirmed: false,
  rideArrived: false,
  ratingComplete: false,
};

const STORAGE_KEYS = {
  ACTIVE_INDEX: "rideActiveIndex",
  STEP_STATES: "rideStepStates",
  OFFER_AMOUNT: "rideOfferAmount",
  OFFER_CONFIRMED: "rideOfferConfirmed",
};

const TOTAL_STEPS = 6;

const Navigate: FC<NavigateProps> = ({ isVisible = true }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 10,
    },
    middle: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      marginTop: 10,
    },
    middleBox: {
      width: "100%",
      borderRadius: 8,
      padding: "8px 15px 5px 15px",
      background: "rgba(255, 255, 255, 0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 15,
    },
    middleIcons: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      cursor: "pointer",
      position: "relative",
      transition: "all 0.2s ease",
    },
    middleIcon: {
      width: 20,
      height: 20,
      color: "var(--dark-200)",
    },
    middleDot: {
      position: "absolute",
      top: -5,
      left: "50%",
      transform: "translateX(-50%)",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    content: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "relative",
    },
    contentBox: {
      width: "100%",
      borderRadius: 8,
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      height: "fit-content",
    },
    contentDot: {
      position: "absolute",
      bottom: -4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    footer: {
      marginTop: 12,
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      paddingTop: 8,
    },
    btn: {
      flex: 1,
      padding: "10px 12px",
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      cursor: "pointer",
      userSelect: "none",
    },
    btnPrimary: {
      backgroundColor: "var(--dark-200)",
      color: "var(--light-100)",
    },
    btnSecondary: {
      backgroundColor: "transparent",
      border: "1px solid rgba(0,0,0,0.06)",
      color: "var(--dark-200)",
    },
  } as const;
  
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const stored = window.localStorage.getItem(
      STORAGE_KEYS.ACTIVE_INDEX,
    );

    const parsed = stored ? Number(stored) : 0;

    if (
      !Number.isFinite(parsed) ||
      parsed < 0 ||
      parsed >= TOTAL_STEPS
    ) {
      return 0;
    }

    return parsed;
  });

  const [pickupDate, setPickupDate] = useState<Date | null>(null);

  const [stepStates, setStepStates] = useState<StepState>(() => {
    if (typeof window === "undefined") {
      return defaultStepState;
    }

    try {
      const stored = window.localStorage.getItem(
        STORAGE_KEYS.STEP_STATES,
      );

      if (!stored) {
        return defaultStepState;
      }

      return {
        ...defaultStepState,
        ...JSON.parse(stored),
      };
    } catch {
      return defaultStepState;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.STEP_STATES,
      JSON.stringify(stepStates),
    );
  }, [stepStates]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.localStorage.setItem(
        STORAGE_KEYS.ACTIVE_INDEX,
        String(activeIndex),
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!stepStates.ratingComplete) {
      return;
    }

    window.localStorage.removeItem(STORAGE_KEYS.STEP_STATES);
    window.localStorage.removeItem(STORAGE_KEYS.ACTIVE_INDEX);
    window.localStorage.removeItem(STORAGE_KEYS.OFFER_AMOUNT);
    window.localStorage.removeItem(STORAGE_KEYS.OFFER_CONFIRMED);

    navigate(ROUTES.ACTIVITY, { replace: true });
  }, [stepStates.ratingComplete, navigate]);

  const updateStepState = useCallback(
    <K extends keyof StepState>(
      key: K,
      value: StepState[K],
    ) => {
      setStepStates((prev) => {
        if (prev[key] === value) {
          return prev;
        }

        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [],
  );

  const updateOfferState = useCallback(
    (isComplete: boolean, isConfirmed: boolean) => {
      setStepStates((prev) => {
        if (
          prev.offerComplete === isComplete &&
          prev.offerConfirmed === isConfirmed
        ) {
          return prev;
        }

        return {
          ...prev,
          offerComplete: isComplete,
          offerConfirmed: isConfirmed,
        };
      });
    },
    [],
  );

  const canNavigateTo = useCallback(
    (targetIndex: number): boolean => {
      if (targetIndex === 0) {
        return activeIndex === null || activeIndex === 0;
      }

      if (
        stepStates.offerConfirmed &&
        stepStates.rideArrived
      ) {
        if (activeIndex === 4) {
          return targetIndex === 4 || targetIndex === 5;
        }

        if (activeIndex === 5) {
          return targetIndex === 4 || targetIndex === 5;
        }
      }

      // allow going back to previous steps unless the ride has started or an offer was confirmed
      if (
        activeIndex !== null &&
        targetIndex < activeIndex
      ) {
        if (stepStates.rideArrived || stepStates.offerConfirmed) {
          return false;
        }
        return true;
      }

      switch (targetIndex) {
        case 1: return stepStates.locationComplete;
        case 2: return stepStates.scheduleComplete;
        case 3: return stepStates.uploadComplete;
        case 4:
          // allow moving to Journey if an offer was confirmed, the offer step is complete,
          // or the user rejected an offer (rideOfferRejected stored in localStorage)
          try {
            const rejected = typeof window !== "undefined" && window.localStorage.getItem("rideOfferRejected");
            if (rejected === "true") return true;
          } catch {}

          return stepStates.offerConfirmed || stepStates.offerComplete;
        case 5: return stepStates.rideArrived;
        default: return false;
      }
    },
    [activeIndex, stepStates],
  );

  useEffect(() => {
    if (
      activeIndex !== null &&
      !canNavigateTo(activeIndex)
    ) {
      setActiveIndex(null);
    }
  }, [activeIndex, canNavigateTo]);

  const currentStepComplete = () => {
    if (activeIndex === null) return false;

    switch (activeIndex) {
      case 0: return stepStates.locationComplete;
      case 1: return stepStates.scheduleComplete;
      case 2: return stepStates.uploadComplete;
      case 3: return stepStates.offerComplete; // allow Next when offer amount meets minimum
      case 4: return stepStates.rideArrived;
      case 5: return stepStates.ratingComplete;
      default: return false;
    }
  };

  const goNext = () => {
    if (activeIndex === null) return;
    if (!currentStepComplete()) return;
    // If we're on the Offer step and amount is valid, navigate to offers list
    if (activeIndex === 3) {
      try {
        const amount = window.localStorage.getItem(STORAGE_KEYS.OFFER_AMOUNT) || "";
        // ensure offerComplete stored state is set (it should be updated via onStateChange)
        const stored = window.localStorage.getItem(STORAGE_KEYS.STEP_STATES);
        const parsed = stored ? JSON.parse(stored) : {};
        parsed.offerComplete = true;
        window.localStorage.setItem(STORAGE_KEYS.STEP_STATES, JSON.stringify(parsed));
      } catch {}

      navigate(ROUTES.OFFERS);
      return;
    }

    const next = Math.min(TOTAL_STEPS - 1, activeIndex + 1);
    setActiveIndex(next);
  };

  const goBack = () => {
    if (activeIndex === null) return;
    if (stepStates.rideArrived || stepStates.offerConfirmed) return;
    const prev = Math.max(0, activeIndex - 1);
    setActiveIndex(prev);
  };


  const handleStepClick = (index: number) => {
    const isActive = activeIndex === index;

    if (isActive) {
      setActiveIndex(null);
      return;
    }

    if (!canNavigateTo(index)) {
      return;
    }

    setActiveIndex(index);
  };

  const icons = useMemo(
    () => [
      MapIcon,
      ClockIcon,
      CameraIcon,
      CashIcon,
      CarIcon,
      CheckIcon,
    ],
    [],
  );

  const iconSize = 40;
  const gap = 36;
  const sidePadding = 16;

  const dotPosition =
    activeIndex !== null
      ? sidePadding +
        activeIndex * (iconSize + gap) +
        iconSize / 2
      : 0;

  const contentComponents = useMemo(
    () => [
      <Location
        key="location"
        onStateChange={(isComplete: boolean) =>
          updateStepState(
            "locationComplete",
            isComplete,
          )
        }
      />,

      <Schedule
        key="schedule"
        pickupDate={pickupDate}
        onPickupDateChange={setPickupDate}
        onStateChange={(isComplete: boolean) =>
          updateStepState(
            "scheduleComplete",
            isComplete,
          )
        }
      />,

      <Upload
        key="upload"
        onStateChange={(isComplete: boolean) =>
          updateStepState(
            "uploadComplete",
            isComplete,
          )
        }
      />,

      <Offer
        key="offer"
        onStateChange={(data: {
          isComplete: boolean;
          isConfirmed: boolean;
          amount: string;
        }) =>
          updateOfferState(
            data.isComplete,
            data.isConfirmed,
          )
        }
      />,

      <Journey
        key="journey"
        onStateChange={(rideArrived: boolean) =>
          updateStepState(
            "rideArrived",
            rideArrived,
          )
        }
      />,

      <Rating
        key="rating"
        onStateChange={(isComplete: boolean) =>
          updateStepState(
            "ratingComplete",
            isComplete,
          )
        }
      />,
    ],
    [
      pickupDate,
      updateOfferState,
      updateStepState,
    ],
  );

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <motion.div key={activeIndex} style={styles.content} variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div style={styles.contentBox}>{contentComponents[activeIndex]}</motion.div>

            <motion.div
              animate={{ left: dotPosition }}
              transition={{ type: "spring", stiffness: 300, damping: 25, }}
              style={{ ...styles.contentDot, transform: "translateX(-50%)", }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={styles.middle}>
        <motion.div style={styles.middleBox}>
          {icons.map((Icon, index) => {
            const isActive = activeIndex === index;
            const isDisabled = !canNavigateTo(index);

            return (
              <motion.div key={index} variants={itemVariants}>
                <Box onClick={() => handleStepClick(index)}
                  style={{
                    ...styles.middleIcons,
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.7)" : "transparent",
                    border: isActive ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                    opacity: isDisabled ? 0.45 : 1,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                  title={ isDisabled ? "Complete the previous step first" : "" }
                >
                  {isActive && ( <Box style={styles.middleDot} /> )}

                  <Icon style={styles.middleIcon} />
                </Box>
              </motion.div>
            );
          })}
        </motion.div>
        {activeIndex !== null && (
          <Box style={styles.footer}>
            <Box
              onClick={goBack}
              style={{
                ...styles.btn,
                ...styles.btnSecondary,
                opacity: activeIndex === 0 || stepStates.rideArrived ? 0.5 : 1,
                cursor: activeIndex === 0 || stepStates.rideArrived ? "not-allowed" : "pointer",
              }}
            >
              Back
            </Box>

            <Box
              onClick={() => { if (currentStepComplete()) goNext(); }}
              style={{
                ...styles.btn,
                ...styles.btnPrimary,
                opacity: currentStepComplete() ? 1 : 0.6,
                cursor: currentStepComplete() ? "pointer" : "not-allowed",
              }}
            >
              <CheckIcon style={{ width: 16, height: 16 }} />
              <span>{activeIndex === TOTAL_STEPS - 1 ? "Done" : "Next"}</span>
            </Box>
          </Box>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Navigate;