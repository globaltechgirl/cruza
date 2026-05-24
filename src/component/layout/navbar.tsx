import { FC } from "react";
import { Box } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconBookmarkFilled,
  IconHomeFilled,
  IconSettingsFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { ROUTES } from "@/utils/constants"; 

const Navbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const styles = {
    navBar: {
      position: "fixed" as const,
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
      width: "35%",
      backgroundColor: "var(--dark-100)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "10px 10px",
      borderRadius: 30,
      zIndex: 1000,
    },
    icon: (active: boolean) => ({
      color: active ? "var(--light-100)" : "var(--dark-200)",
      cursor: "pointer",
    }),
  } as const;

  return (
    <Box style={styles.navBar}>
      <IconHomeFilled
        size={18}
        style={styles.icon(location.pathname === ROUTES.HOME)}
        onClick={() => navigate(ROUTES.HOME)}
      />
      <IconBookmarkFilled
        size={18}
        style={styles.icon(location.pathname === ROUTES.ACTIVITY)}
        onClick={() => navigate(ROUTES.ACTIVITY)}
      />
      <IconSettingsFilled
        size={18}
        style={styles.icon(location.pathname === ROUTES.SETTINGS)}
        onClick={() => navigate(ROUTES.SETTINGS)}
      />
      <IconUserFilled
        size={18}
        style={styles.icon(location.pathname === ROUTES.ACCOUNT)}
        onClick={() => navigate(ROUTES.ACCOUNT)}
      />
    </Box>
  );
};

export default Navbar;
