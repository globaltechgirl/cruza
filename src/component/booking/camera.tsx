import { FC, useState, useRef, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import BagIcon from "@/assets/icons/bag";
import BookmarkIcon from "@/assets/icons/bookmark";
import CheckIcon from "@/assets/icons/checks";
import Bag1 from "@/assets/bag1.jpg";
import Bag2 from "@/assets/bag2.jpg";
import Bag3 from "@/assets/bag3.jpg";

const Camera: FC = () => {
  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      overflow: "hidden",
      position: "relative",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      border: "1px dashed var(--dark-300)",
      background:
        "linear-gradient(135deg, var(--light-100) 0%, var(--light-100) 50%, var(--light-100) 100%)",
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
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 30,
      padding: "40px 15px 20px 15px",
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative",
      zIndex: 1,
    },
    content: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 25,
    },
    leftSide: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
    },
    sideIcons: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sideIcon: {
      width: 10,
      height: 10,
      color: "var(--dark-200)",
    },
    dashedLine: {
      width: 1,
      height: 60,
      borderLeft: "1px dashed var(--dark-400)",
    },
    rightSide: {
      display: "flex",
      flexDirection: "column",
      gap: 30,
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    title: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    description: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.8,
    },
    imageStack: {
      position: "relative",
      width: "100%",
      maxWidth: 280,
      height: 220,
      cursor: "pointer",
      marginTop: 10,
    },
    bagImage1: {
      position: "absolute",
      top: 0,
      left: "0%",
      width: "65%",
      height: 220,
      transform: "rotate(-2deg)",
      zIndex: 3,
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    bagImage2: {
      position: "absolute",
      top: 0,
      left: "20%",
      width: "65%",
      height: 220,
      transform: "rotate(2deg)",
      zIndex: 2,
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    bagImage3: {
      position: "absolute",
      top: 5,
      left: "35%",
      width: "65%",
      height: 220,
      transform: "rotate(5deg)",
      zIndex: 1,
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    bagImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 8,
    },
    approve: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
      borderRadius: 6,
      backgroundColor: "var(--light-100)",
      width: "fit-content",
      padding: "3px 8px",
    },
    approveIcon: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    approveText: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "capitalize",
    },
    viewerOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      border: "1px dashed var(--dark-300)",
    },
    viewerMain: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    arrowLeft: {
      position: "absolute",
      left: 10,
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
    arrowRight: {
      position: "absolute",
      right: 10,
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
    arrowIcon: {
      width: 13,
      height: 13,
      color: "var(--dark-200)",
      cursor: "pointer",
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
  } as const;

  const images = [Bag1, Bag2, Bag3];

  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openViewer = (index: number) => {
    setCurrentImage(index);
    setViewerOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const descRef = useRef<HTMLDivElement>(null);
  const lugRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLDivElement>(null);

  const [heights, setHeights] = useState({
    desc: 0,
    lug: 0,
    approve: 0,
  });

  useEffect(() => {
    setHeights({
      desc: descRef.current?.offsetHeight || 0,
      lug: lugRef.current?.offsetHeight || 0,
      approve: approveRef.current?.offsetHeight || 0,
    });
  }, []);

  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noiseOverlay} />
      
      <Box style={styles.body}>
        <Box style={styles.content}>
          <Box style={styles.leftSide}>
            <Box style={styles.sideIcons}>
              <BookmarkIcon style={styles.sideIcon} />
            </Box>

            <Box
              style={{
                width: 1,
                height: heights.desc,
                borderLeft: "1px dashed var(--dark-400)",
              }}
            />

            <Box style={styles.sideIcons}>
              <BagIcon style={styles.sideIcon} />
            </Box>

            <Box
              style={{
                width: 1,
                height: heights.lug,
                borderLeft: "1px dashed var(--dark-400)",
              }}
            />

            <Box style={styles.sideIcons}>
              <CheckIcon style={styles.sideIcon} />
            </Box>
          </Box>

          <Box style={styles.rightSide}>
            <Box ref={descRef} style={styles.section}>
              <Text style={styles.title}>Description</Text>

              <Text style={styles.description}>
                Premium travel luggage designed for comfort, durability,
                and elegance. Perfect for business trips, vacations,
                and everyday movement with spacious compartments and
                secure storage.
              </Text>
            </Box>

            <Box ref={lugRef} style={styles.section}>
              <Text style={styles.title}>Luggage</Text>

              <Box
                style={styles.imageStack}
                onClick={(e) => {
                  e.stopPropagation();
                  openViewer(0);
                }}
              >
                <Box style={styles.bagImage1}>
                  <img src={Bag1} alt="Bag 1" style={styles.bagImage} />
                </Box>
                <Box style={styles.bagImage2}>
                  <img src={Bag2} alt="Bag 2" style={styles.bagImage} />
                </Box>
                <Box style={styles.bagImage3}>
                  <img src={Bag3} alt="Bag 3" style={styles.bagImage} />
                </Box>
              </Box>
            </Box>

            <Box ref={approveRef} style={styles.section}>
              <Text style={styles.title}>Approval</Text>

              <Box style={styles.approve}>
                <CheckIcon style={styles.approveIcon} />
                <Text style={styles.approveText}>Approve Luggage</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {viewerOpen && (
        <Box style={styles.viewerOverlay}>
          <Box style={styles.closeIcons} onClick={() => setViewerOpen(false)}>
            <IconX style={styles.closeIcon} />
          </Box>

          <Box style={styles.arrowLeft} onClick={prevImage}>
            <IconChevronLeft style={styles.arrowIcon} />
          </Box>

          <img src={images[currentImage]} alt="Preview" style={styles.viewerMain} />

          <Box style={styles.arrowRight} onClick={nextImage}>
            <IconChevronRight style={styles.arrowIcon} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Camera;
