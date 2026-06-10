import { FC, useEffect, useState } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import MapImage from "@/assets/map.jpg";
import Logo from "@/assets/logo.svg?react";
import { IconArrowRight, IconEye, IconEyeOff } from "@tabler/icons-react";

import CenterImg1 from "@/assets/icon.svg";
import CenterImg2 from "@/assets/icon.svg";
import CenterImg3 from "@/assets/icon.svg";
import GoogleIcon from "@/assets/icons/google";

const ROUTES = {
  HOME: "/home",
  LOGIN: "/login"
};

const slides = [CenterImg1, CenterImg2, CenterImg3];

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

interface RegisterProps {
  isVisible?: boolean;
}

const Register: FC<RegisterProps> = ({ isVisible = true }) => {
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("P@ssword123!");
  const [showPassword, setShowPassword] = useState(false);
  
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!emailPattern.test(email)) {
      return;
    }

    if (!passwordPattern.test(password)) {
      return;
    }

    window.location.href = ROUTES.HOME;
  };

  const handleGoogleRedirect = () => {
    window.open("https://accounts.google.com/ChooseAccount", "_blank");
  };

  const handleLoginRouteRedirect = () => {
    window.location.href = ROUTES.LOGIN;
  };

  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
    },
    map: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${MapImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 0,
    },
    gradient: {
      position: "absolute",
      inset: 0,
      background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.10) 100%)`,
      zIndex: 1,
      pointerEvents: "none",
    },
    noise: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 2,
      pointerEvents: "none",
      filter: "url(#noiseFilter)",
      opacity: 0.2,
    },
    blur: {
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      maskImage: `linear-gradient(to bottom, transparent 0%, black 0%, black 100%)`,
      WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 0%, black 100%)`,
      background: `linear-gradient( to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.15) 100%)`,
      zIndex: 0,
    },
    body: {
      padding: "20px 15px",
      zIndex: 10,
      height: "100vh",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logos: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    },
    logo: {
      width: 20,
      height: 20,
      borderRadius: 5,
      margin: "0 auto",
    },
    title: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--dark-100)",
      textTransform: "uppercase",
    },
    center: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
    },
    images: {
      width: 280,
      height: 280,
    },
    image: {
      width: "100%",
      height: "100%",
      objectPosition: "center",
      objectFit: "cover",
    },
    dots: {
      display: "flex",
      gap: 6,
    },
    dot: {
      height: 6,
      borderRadius: 10,
      backgroundColor: "var(--dark-400)",
      transition: "all 0.3s ease",
    },
    active: {
      width: 20,
      backgroundColor: "var(--dark-200)",
    },
    inactive: {
      width: 6,
    },
    content: {
      zIndex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 30,
    },
    info: {
      fontSize: 30,
      fontWeight: 800,
      color: "var(--dark-200)",
      textTransform: "uppercase",
      lineHeight: "28px",
      letterSpacing: -0.5,
      transform: "scaleY(1.50)",
      marginTop: 10,
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    input: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      padding: "8px 12px",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "uppercase",
      marginBottom: 2,
      letterSpacing: "0.5px"
    },
    value: {
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 12,
      fontWeight: 550,
      color: "var(--dark-100)",
      width: "100%",
      padding: "2px 0px",
    },
    passwords: {
      display: "flex",
      width: "100%",
      gap: 10
    },
    password: {
      flex: 1,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      padding: "8px 12px",
      textAlign: "left",
    },
    pass: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    icon: {
      width: 18,
      height: 18,
      color: "var(--dark-200)",
      cursor: "pointer",
    },
    arrows: {
      backgroundColor: "var(--dark-200)", 
      border: "1px solid var(--dark-200)",
      width: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    arrow: {
      width: 24,
      height: 24,
      color: "var(--light-200)",
      cursor: "pointer",
    },
    line: {
      width: "100%",
      border: "none",
      borderTop: "1px dashed var(--light-100)",
      margin: "-10px 0",
    },
    googles: {
      width: "100%",
      position: "relative",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      padding: "18px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    },
    google: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    },
    icona: {
      width: 14,
      height: 14,
    },
    span: {
      fontSize: 12,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "uppercase",
    },
    corner: {
      position: "absolute",
      width: 8,
      height: 8,
      borderColor: "var(--light-100)",
      borderStyle: "solid",
    },
    left1: { top: 0, left: 0, borderWidth: "1.5px 0 0 1.5px" },
    right1: { top: 0, right: 0, borderWidth: "1.5px 1.5px 0 0" },
    left2: { bottom: 0, left: 0, borderWidth: "0 0 1.5px 1.5px" },
    right2: { bottom: 0, right: 0, borderWidth: "0 1.5px 1.5px 0" },
    links: {
      fontSize: 12,
      fontWeight: "550",
      color: "var(--dark-200)",
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: -15
    },
    link: {
      textDecoration: "underline",
      textUnderlineOffset: "2px", 
      color: "var(--dark-100)",
    },
  } as const;

  return (
    <motion.div style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.map} />
      <Box style={styles.gradient} />
      <Box style={styles.noise} />
      <Box style={styles.blur} />

      <motion.div style={styles.body}>
        <motion.div style={styles.logos} variants={itemVariants}>
          <Logo style={styles.logo} />
          <Text style={styles.title}>Cruza</Text>
        </motion.div>

        <Box style={styles.content}>
          <motion.div style={styles.center} variants={itemVariants}>
            <Box style={styles.images}><img src={slides[active]} alt="center" style={styles.image}/></Box>

            <Box style={styles.dots}>
              {slides.map((_, index) => (
                <Box
                  key={index}
                  style={{
                    ...styles.dot,
                    ...(active === index
                      ? styles.active
                      : styles.inactive),
                  }}
                />
              ))}
            </Box>
          </motion.div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <motion.div style={styles.input} variants={itemVariants}>
              <Text style={styles.label}>Email</Text>
              <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={styles.value} 
                required 
              />
            </motion.div>

            <motion.div style={styles.passwords} variants={itemVariants}>
              <Box style={styles.password}>
                <Text style={styles.label}>Password</Text>
                <Box style={styles.pass}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={styles.value} 
                    required 
                  />
                  <Box onClick={() => setShowPassword(!showPassword)} style={{ display: "flex", alignItems: "center" }}>
                    {showPassword ? (
                      <IconEyeOff style={styles.icon} />
                    ) : (
                      <IconEye style={styles.icon} />
                    )}
                  </Box>
                </Box>
              </Box>

              <button type="submit" style={styles.arrows}>
                <IconArrowRight style={styles.arrow} />
              </button>
            </motion.div>
          </form>

          <hr style={styles.line} />

          <motion.div style={styles.googles} variants={itemVariants} onClick={handleGoogleRedirect}>
            <div style={{...styles.corner, ...styles.left1}}></div>
            <div style={{...styles.corner, ...styles.right1}}></div>
            <div style={{...styles.corner, ...styles.left2}}></div>
            <div style={{...styles.corner, ...styles.right2}}></div>
            
            <Box style={styles.google}>
              <GoogleIcon style={styles.icona} />
              <Text style={styles.span}>Continue with Google</Text>
            </Box>
          </motion.div>

          <motion.div style={styles.links} variants={itemVariants}>
            Already have an account? {" "}
            <span style={styles.link} onClick={handleLoginRouteRedirect}>Login</span>
          </motion.div>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Register;