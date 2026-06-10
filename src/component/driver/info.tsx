import { FC } from "react";
import { Box, Text } from "@mantine/core";
import Logo from "@/assets/logo.svg?react";
import ProfileImg from "@/assets/user.jpg";
import BellIcon from "@/assets/icons/bell";
import SparkIcon from "@/assets/icons/spark";

const Info: FC = () => {
  const styles = {
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      padding: 15,
      width: "100%"
    },
    box: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
      width: 25,
      height: 25,
      borderRadius: 6
    },
    icons: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    top: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      width: "100%"
    },
    initialsWrapper: {
      width: 100,
      height: 100,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 2,
      display: "flex",  
      alignItems: "center",
    },
    initialsBox: {
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
    topText: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2
    },
    topFull: {
      fontSize: 14,
      fontWeight: 580,
      color: "var(--dark-100)",
      textTransform: "capitalize"
    },
    topUser: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase"
    },
    topSpans: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
      width: "100%"
    },
    topSpan: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      gap: 6
    },
    topValue: {
      fontSize: 13,
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    topLabel: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "capitalize",
      marginBottom: 1.5
    },
    middle: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 10,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      marginTop: 10
    },
    middleBox: {
      width: "100%",
      borderRadius: 8,
      padding: 10,
      background: "rgba(255, 255, 255, 0.25)",
      display: "flex",
      flexDirection: "column",
      gap: 15,
    },
    middleTop: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    middleIcons: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    middleIcon: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    middleTitle: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    barBox: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      width: "100%",
    },
    bar: {
      flex: 1,
      height: 8,
      borderRadius: 8,
      backgroundColor: "color-mix(in srgb, var(--dark-400) 40%, transparent)",
    },
    barFilled: {
      flex: 1,
      height: 8,
      borderRadius: 8,
      backgroundColor: "var(--dark-200)",
    },
    middleText: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.4,
    },
    body: {
      backgroundColor: "var(--light-100)",
      padding: "5px 15px",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    }
  } as const;

  return (
    <Box style={styles.main}>
      <Box style={styles.box}>
        <Logo style={styles.logo} />
        <Box style={styles.icons}>
          <BellIcon style={styles.icon}/>
        </Box>
      </Box>

      <Box style={styles.top}>
        <Box style={styles.initialsWrapper}>
          <img src={ProfileImg} alt="Profile Img" style={styles.initialsBox} />
        </Box>

        <Box style={styles.topText}>
          <Text style={styles.topFull}>Daniel Smith</Text>
          <Text style={styles.topUser}>@danielsmith</Text>
        </Box>

        <Box style={styles.topSpans}>
          <Box style={styles.topSpan}>
            <Text style={styles.topValue}>100</Text>
            <Text style={styles.topLabel}>Reviews</Text>
          </Box>
          <Box style={styles.topSpan}>
            <Text style={styles.topValue}>1582</Text>
            <Text style={styles.topLabel}>Rides</Text>
          </Box>
          <Box style={styles.topSpan}>
            <Text style={styles.topValue}>2</Text>
            <Text style={styles.topLabel}>Vehicles</Text>
          </Box>
        </Box>
      </Box>

      <Box style={styles.middle}>
        <Box style={styles.middleBox}>
          <Box style={styles.middleTop}>
            <Box style={styles.middleIcons}>
              <SparkIcon style={styles.middleIcon} />
            </Box>

            <Text style={styles.middleTitle}>Weekly Ride Activity</Text>
          </Box>

          <Box style={styles.barBox}>
            <Box style={styles.barFilled} />
            <Box style={styles.barFilled} />
            <Box style={styles.barFilled} />
            <Box style={styles.barFilled} />
            <Box style={styles.barFilled} />
            <Box style={styles.barFilled} />
            <Box style={styles.bar} />
            <Box style={styles.bar} />
            <Box style={styles.bar} />
          </Box>

          <Text style={styles.middleText}>
             You have completed 75% of your weekly ride activity!
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
