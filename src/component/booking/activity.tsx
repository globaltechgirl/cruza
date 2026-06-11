import { FC, useEffect, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import { IconCircleFilled, IconX } from "@tabler/icons-react";
import ProfileImg from "@/assets/user.jpg";
import MapImage from "@/assets/map.jpg";
import CarIcon from "@/assets/icons/car";
import StarIcon from "@/assets/icons/star";
import CaptureIcon from "@/assets/icons/capture";

type Props = {
  onClose: () => void;
};

const Activity: FC<Props> = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [iconReached, setIconReached] = useState(false);
  const [rideStatus, setRideStatus] = useState("started");

  const barRef = useRef<HTMLDivElement | null>(null);
  const [barWidth, setBarWidth] = useState(0);
  const iconSize = 10; 

  const [isMapExpanded, setIsMapExpanded] = useState(false);

  useEffect(() => {
    if (!barRef.current) return;

    const updateWidth = () => {
      setBarWidth(barRef.current!.offsetWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!barWidth || iconReached) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.01; 

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

  const [ rating ] = useState(4);

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => {
      const filled = i < rating;

      return (
        <StarIcon
          key={i}
          style={filled ? styles.reviewIcons : styles.reviewIcon}
        />
      );
    });
  };

  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      overflow: "hidden",
      position: "relative",
      background:
        "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
    },
    noiseOverlay: {
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
    body: {
      display: "flex",
      flexDirection: "column",
      gap: 30,
      padding: 15,
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative",
      zIndex: 1,
    },
    top: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      position: "relative",
    },
    topIcons: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    topIcon: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    middle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      width: "100%"
    },
    middleImage: {
      width: 50,
      height: 50,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 2,
      display: "flex",  
      alignItems: "center",
    },
    middleImg: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "cover",
      objectPosition: "top"
    },
    middleTexts: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2
    },
    middleTitle: {
      fontSize: 13,
      fontWeight: 550,
      color: "var(--dark-100)",
      textTransform: "capitalize"
    },
    middleText: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "lowercase"
    },
    middleScroller: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      width: "80%"
    },
    middleScroll: {
      position: "relative",
      height: 10,
      backgroundImage: "repeating-linear-gradient(-45deg, var(--light-200) 0, var(--light-200) 6px, var(--dark-400) 6px, var(--dark-400) 10px)",
      borderRadius: 6,
      border: "1px dashed var(--dark-400)",
      marginTop: 5,
      width: "100%"
    },
    carIcons: {
      position: "absolute",
      top: -3,
      left: 0, 
      width: 20,
      height: 15,
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
    carIcon: { 
      width: 10,
      height: 10,
      color: "var(--dark-200)",
    },
    circleIcons: { 
      position: "absolute", 
      top: -3,
      right: -2, 
      width: 14,
      height: 14,
      border: "1px solid var(--dark-400)",
      backgroundColor: "var(--light-100)",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    circleIcon: { 
      width: 10,
      height: 10,
      color: "var(--dark-400)",
    },
    middleSpan: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
    },
    middleSpans: {
      color: "var(--dark-100)",
    },
    bottom: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    },
    map: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 25,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "relative",
    },
    maps: {
      width: "100%",
      borderRadius: 23,
      background: "rgba(255, 255, 255, 0.25)",
      position: "relative",
      overflow: "hidden",
    },
    mapImg: {
      width: "100%",
      height: 300,
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 23,
    },
    captureIcons: {
      position: "absolute", 
      bottom: 10,           
      right: 10,      
      width: 22,
      height: 22,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 2,  
    },
    captureIcon: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    reviewWrapper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      padding: 2,
    },
    reviewBox: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      gap: 6,
      padding: 8,
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.25)",
    },
    reviewIcons: { 
      width: 14,
      height: 14,
      color: "var(--dark-200)",
    },
    reviewIcon: { 
      width: 14,
      height: 14,
      color: "color-mix(in srgb, var(--dark-400) 40%, transparent)",
    },
    reviewText: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
      lineHeight: 1.8,
      textAlign: "justify"
    },
    viewerOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "95%",
      height: "97.5%",
      border: "1px solid var(--light-100)",
      borderRadius: 15,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      margin: "10px auto 0"
    },
    viewerMain: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.25)",
    },
    closeIcons: {
      position: "absolute",
      top: 15,
      right: 15,
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    closeIcon: {
      width: 10,
      height: 10,
      color: "var(--dark-200)",
    },
    viewerImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 12,
    },
  } as const;

  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>
      
      <Box style={styles.noiseOverlay} />

      <Box style={styles.body}>
        <Box style={styles.top}>
          <Box style={styles.topIcons} onClick={onClose}>
            <IconX style={styles.topIcon}  />
          </Box>
        </Box>

        <Box style={styles.middle}>
          <Box style={styles.middleImage}>
            <img src={ProfileImg} alt="Profile Img" style={styles.middleImg} />
          </Box>

          <Box style={styles.middleTexts}>
            <Text style={styles.middleTitle}>Daniel Smith</Text>
            <Text style={styles.middleText}>location - Babcock University</Text>
          </Box>

          <Box style={styles.middleScroller}>
            <Box ref={barRef} style={styles.middleScroll}>
              {!iconReached && (
                <Box style={styles.carIcons}>
                  <CarIcon style={styles.carIcon} />
                </Box>
              )}

              {!iconReached && (
                <Box style={styles.circleIcons}>
                  <IconCircleFilled style={styles.circleIcon} />
                </Box>
              )}

              {iconReached && (
                <Box style={styles.carIcons}>
                  <CarIcon style={styles.carIcon} />
                </Box>
              )}
            </Box>

            <Text style={styles.middleSpan}>
              {rideStatus === "started" && (
                <>
                  Driver has <span style={styles.middleSpans}>arrived</span>
                </>
              )}

              {rideStatus === "ongoing" && (
                <>
                  Arrives in <span style={styles.middleSpans}>54 mins</span>
                </>
              )}

              {rideStatus === "ended" && (
                <>
                  Ride has <span style={styles.middleSpans}>ended</span>
                </>
              )}
            </Text>
          </Box>
        </Box>
        
        <Box style={styles.bottom}>
          <Box style={styles.map}>
            <Box style={styles.maps}>
              <img src={MapImage} alt="map" style={styles.mapImg} />
              <Box style={styles.captureIcons} onClick={() => setIsMapExpanded(true)}>
                <CaptureIcon style={styles.captureIcon} />
              </Box>
            </Box>
          </Box>

          <Box style={styles.reviewWrapper}>
            <Box style={styles.reviewBox}>{renderStars()}</Box>
          </Box>

          <Box style={styles.reviewWrapper}>
            <Box style={styles.reviewBox}>
              <Text style={styles.reviewText}>
                Excellent service! The driver was on time, helped with our luggage, and possessed great communication skills. Highly professional and polite.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {isMapExpanded && (
        <Box style={styles.viewerOverlay}>
          <Box style={styles.viewerMain}>
            <Box style={styles.closeIcons} onClick={() => setIsMapExpanded(false)}>
              <IconX style={styles.closeIcon} />
            </Box>
          </Box>

          <img src={MapImage} style={styles.viewerImg} />
        </Box>
      )}
    </Box>
  );
};

export default Activity;
