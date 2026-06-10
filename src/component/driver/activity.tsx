import { FC, useState } from "react";
import { Box, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import MapIcon from "@/assets/icons/map";
import MoneyIcon from "@/assets/icons/money";
import BellIcon from "@/assets/icons/bell";

const Activity: FC = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    top: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      padding: 2,
      cursor: "pointer",
    },
    topMain: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      backgroundColor: "var(--light-200)",
      display: "flex",
      flexDirection: "column",
      gap: 15,
    },
    topBoxs: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    topBox: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    topIcons: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    topIcon: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    topArrow: {
      width: 14,
      height: 14,
    },
    topTitle: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    topText: {
      fontSize: 13,
      fontWeight: 550,
      color: "var(--dark-100)",
      lineHeight: 1.4,
    },
    topSpan: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    topSpan1: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      borderRadius: 4,
      backgroundColor: "var(--light-100)",
      width: "fit-content",
      padding: "2px 6px"
    },
    topSpan2: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    title: {
      fontSize: 12.5,
      fontWeight: 550,
      color: "var(--dark-100)",
      textTransform: "capitalize",
      marginTop: 10,
      marginLeft: 2
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
      gap: 12,
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
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    subText: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
    },
  } as const;

  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    if (current > 0) {setCurrent(current - 1);}
  };

  const handleNext = () => {
    if (current < reminders.length - 1) {setCurrent(current + 1);}
  };

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

  const reminders = [
    {
      text: "You have a ride in 15 minutes!",
      time: "9:00 AM - 10:00 AM",
    },
    {
      text: "Pickup scheduled for Victoria Island",
      time: "11:00 AM - 12:00 PM",
    },
    {
      text: "Don't forget your evening ride",
      time: "4:00 PM - 5:00 PM",
    },
    {
      text: "Late night ride confirmed",
      time: "8:00 PM - 9:00 PM",
    },
  ];

  return (
    <Box style={styles.container}>
      <Box style={styles.top} onClick={() => navigate(ROUTES.BOOKING)}>
        <Box style={styles.topMain}>
          <Box style={styles.topBoxs}>
            <Box style={styles.topBox}>
              <Box style={styles.topIcons}>
                <BellIcon style={styles.topIcon} />
              </Box>

              <Text style={styles.topTitle}>Reminders</Text>
            </Box>

            <Box style={styles.topBox}>
              <IconChevronLeft
                style={{
                  ...styles.topArrow,
                  cursor: current === 0 ? "not-allowed" : "pointer",
                  opacity: current === 0 ? 0.4 : 1,
                }}
                onClick={handlePrev}
              />

              <IconChevronRight
                style={{
                  ...styles.topArrow,
                  cursor: current === reminders.length - 1 ? "not-allowed" : "pointer",
                  opacity: current === reminders.length - 1 ? 0.4 : 1,
                }}
                onClick={handleNext}
              />
            </Box>
          </Box>

          <Text style={styles.topText}>
            {reminders[current].text}
          </Text>

          <Box style={styles.topSpan}>
            <Text style={styles.topSpan1}>
              {reminders[current].time}
            </Text>
            <Text style={styles.topSpan2}>
              {current + 1} of {reminders.length}
            </Text>
          </Box>
        </Box>
      </Box>

      <Text style={styles.title}>Recent Activity</Text>

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
  );
};

export default Activity;
