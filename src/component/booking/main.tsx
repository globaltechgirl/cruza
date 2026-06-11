import { FC, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import Card from "./card";
import GridIcon from "@/assets/icons/grid";
import { IconX } from "@tabler/icons-react";
import ChatIcon from "@/assets/icons/chat";
import DotsIcon from "@/assets/icons/dots";
import CameraIcon from "@/assets/icons/camera";
import CarIcon from "@/assets/icons/car";
import Camera from "./camera";
import Chat from "./chat";
import Activity from "./activity";

const Main: FC = () => {
  const navigate = useNavigate();
  const [offerAccepted, setOfferAccepted] = useState(false);
  
  const MIN_HEIGHT = 70;
  const MAX_HEIGHT = 96;

  const [cameraOpen, setCameraOpen] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(MIN_HEIGHT);
  const [chatOpen, setChatOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);
  const startHeight = useRef(MIN_HEIGHT);
  const raf = useRef<number | null>(null);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const updateHeight = (clientY: number) => {
    const diff = startY.current - clientY;

    const next = clamp(
      startHeight.current + diff * 0.15,
      MIN_HEIGHT,
      MAX_HEIGHT
    );

    setOverlayHeight(next);
  };

  const startDrag = (y: number) => {
    setIsDragging(true);
    startY.current = y;
    startHeight.current = overlayHeight;
  };

  const stopDrag = () => {
    setIsDragging(false);

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", stopDrag);

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", stopDrag);

    if (raf.current) cancelAnimationFrame(raf.current);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (raf.current) cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      updateHeight(e.clientY);
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    if (raf.current) cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      updateHeight(e.touches[0].clientY);
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientY);

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stopDrag);
  };

  const toggleSheet = () => {
    setOverlayHeight((prev) =>
      prev < 80 ? MAX_HEIGHT : MIN_HEIGHT
    );
  };

  const closeSheet = () => {
    setOverlayHeight(MIN_HEIGHT);
    setCameraOpen(false);
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
      justifyContent: "space-between",
      alignItems: "center",
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
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
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
    card: {
      width: "90%",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
    },
    bottoms: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    },
    bottomIcons: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    bottomIcon: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    bottomText: {
      fontSize: 10,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    cameraOverlay: {
      position: "fixed",
      left: "50%",
      bottom: 0,
      width: "96%",
      height: `${overlayHeight}vh`,
      zIndex: 999,
      transform: cameraOpen
        ? "translate(-50%, 0)"
        : "translate(-50%, 100%)",
      transition: isDragging
        ? "none"
        : "transform 0.35s ease, height 0.25s ease",
      willChange: "transform, height",
    },
    dragHandleWrap: {
      position: "absolute",
      top: 15,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      cursor: isDragging ? "grabbing" : "grab",
      touchAction: "none",
    },
    dragHandle: {
      width: 30,
      height: 3.5,
      borderRadius: 4,
      backgroundColor: "var(--dark-400)",
      cursor: isDragging ? "grabbing" : "grab",
      opacity: 0.7,
    },
    chatOverlay: {
      position: "fixed",
      left: "50%",
      bottom: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      zIndex: 999,
      transform: chatOpen
        ? "translate(-50%, 0)"
        : "translate(-50%, 100%)",
      transition: "transform 0.35s ease",
      backgroundColor: "var(--light-100)",
    },
    activityOverlay: {
      position: "fixed",
      left: "50%",
      bottom: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      zIndex: 999,
      transform: activityOpen
        ? "translate(-50%, 0)"
        : "translate(-50%, 100%)",
      transition: "transform 0.35s ease",
      backgroundColor: "var(--light-100)",
    },
  } as const;

  return (
    <>
      <Box style={styles.container}>
        <svg style={{ display: "none" }}>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          </filter>
        </svg>

        <Box style={styles.noiseOverlay} />
        
        <Box
          style={styles.body}
          onClick={() => { if (cameraOpen) closeSheet(); }}
        >
          <Box style={styles.top}>
            <Box style={styles.topIcons}>
              <GridIcon style={styles.topIcon} />
            </Box>
            <Box style={styles.topIcons} onClick={() => navigate(ROUTES.DRIVER)}>
              <IconX style={styles.topIcon} />
            </Box>
          </Box>

          <Box style={styles.card}>
            <Card offerAccepted={offerAccepted} setOfferAccepted={setOfferAccepted} />
          </Box>
        
          <Box style={styles.bottom}>
            <Box style={styles.bottoms}>
              <Box style={styles.bottomIcons} onClick={() => setCameraOpen(true)}>
                <CameraIcon style={styles.bottomIcon} />
              </Box>
              <Text style={styles.bottomText}>Camera</Text>
            </Box>

            <Box style={styles.bottoms}>
              <Box
                style={styles.bottomIcons}
                onClick={() => {
                  if (!offerAccepted) return;
                  setChatOpen(true);
                }}
              >
                <ChatIcon style={styles.bottomIcon} />
              </Box>
              <Text style={styles.bottomText}>Messages</Text>
            </Box>

            <Box style={styles.bottoms}>
              <Box
                style={styles.bottomIcons}
                onClick={() => {
                  if (!offerAccepted) return;
                  setActivityOpen(true);
                }}
              >
                <CarIcon style={styles.bottomIcon} />
              </Box>
              <Text style={styles.bottomText}>activity</Text>
            </Box>  

            <Box style={styles.bottoms}>
              <Box style={styles.bottomIcons}>
                <DotsIcon style={styles.bottomIcon} />
              </Box>
              <Text style={styles.bottomText}>More</Text>
            </Box>  
          </Box>
        </Box>
      </Box>

      {cameraOpen && (
        <Box
          style={styles.cameraOverlay}
          onClick={closeSheet} 
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <Box
              style={styles.dragHandleWrap}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onClick={toggleSheet}
            >
              <Box style={styles.dragHandle} />
            </Box>

            <Camera />
          </Box>
        </Box>
      )}

      {chatOpen && (
        <Box style={styles.chatOverlay} onClick={() => setChatOpen(false)}>
          <Box onClick={(e) => e.stopPropagation()}>
            <Chat onClose={() => setChatOpen(false)} />
          </Box>
        </Box>
      )}

      {activityOpen && (
        <Box style={styles.activityOverlay} onClick={() => setActivityOpen(false)}>
          <Box onClick={(e) => e.stopPropagation()}>
            <Activity onClose={() => setActivityOpen(false)} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Main;
