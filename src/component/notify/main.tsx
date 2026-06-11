import { FC } from "react";
import { Box, Text } from "@mantine/core";
import MapIcon from "@/assets/icons/map";
import MoneyIcon from "@/assets/icons/money";

const Main: FC = () => {
  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "calc(var(--vh) * 100)",
      gap: 6,
      overflow: "hidden",
      position: "relative",
      background: "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
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
      alignItems: "flex-start",
      gap: 15,
      padding: 15,
      width: "100%",
      height: "100%",
      position: "relative",
      zIndex: 1,
    },
    main: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      padding: 2,
    },
    card: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 14px 6px 6px",
      borderRadius: 8,
      backgroundColor: "var(--light-200)",
      gap: 10,
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--light-100)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },
    iconStyle: {
      width: 20,
      height: 20,
      color: "var(--dark-200)",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flex: 1,
    },
    mainText: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    subText: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
    },
  } as const;

  const activities = [
    {
      icon: <MapIcon style={styles.iconStyle} />,
      mainText: "Ride to Victoria Island",
      subText: "Ride",
      date: "24.04.26",
    },
    {
      icon: <MoneyIcon style={styles.iconStyle} />,
      mainText: "Ride Payment Received",
      subText: "Payment",
      date: "23.04.26",
    },
    {
      icon: <MapIcon style={styles.iconStyle} />,
      mainText: "Ride to Lekki Phase 1",
      subText: "Ride",
      date: "22.04.26",
    },
    {
      icon: <MoneyIcon style={styles.iconStyle} />,
      mainText: "Ride Payment Received",
      subText: "Payment",
      date: "21.04.26",
    },
    {
      icon: <MapIcon style={styles.iconStyle} />,
      mainText: "Ride to Yaba",
      subText: "Ride",
      date: "20.04.26",
    },
  ];

  return (
    <Box style={styles.container}>
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noiseOverlay} />

      <Box style={styles.body}>
        {activities.map((item, index) => {
          return (
            <Box key={index} style={styles.main}>
              <Box style={styles.card}>
                <Box style={styles.iconBox}>{item.icon}</Box>

                <Box style={styles.content}>
                  <Text style={styles.mainText}>{item.mainText}</Text>
                  <Text style={styles.subText}>{item.subText}</Text>
                </Box>

                <Box style={styles.subText}>{item.date}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Main;