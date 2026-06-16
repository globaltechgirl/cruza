import { FC, useState, useRef, useEffect } from "react"; 
import { Box, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconX, 
  IconChevronRight, 
  IconChevronLeft, 
  IconAlertCircle, 
  IconPlus, 
  IconCheck, 
  IconPlayerPause,
  IconArrowRight,
  IconEyeOff,
  IconEye
} from "@tabler/icons-react";
import { ROUTES } from "@/utils/constants";

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

interface OnboardingProps {
  isVisible?: boolean;
}

const Onboarding: FC<OnboardingProps> = ({ isVisible = true }) => {
  const [animKey, setAnimKey] = useState(0);
  const [screen, setScreen] = useState<string>("checklist");
  const [direction, setDirection] = useState<number>(1);

  const licenseInputRef = useRef<HTMLInputElement>(null);
  const vehicleInputRef = useRef<HTMLInputElement>(null);
  const regPrimaryInputRef = useRef<HTMLInputElement>(null);
  const regOptionalInputRef = useRef<HTMLInputElement>(null);

  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [vehicleFile, setVehicleFile] = useState<File | null>(null);
  const [regPrimaryFile, setRegPrimaryFile] = useState<File | null>(null);
  const [regOptionalFile, setRegOptionalFile] = useState<File | null>(null);

  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [productionYear, setProductionYear] = useState<number | string>("");

  const [regExpiry, setRegExpiry] = useState("");

  const [isLicenseImageBlurry, setIsLicenseImageBlurry] = useState(false);
  const [isVehicleImageBlurry, setIsVehicleImageBlurry] = useState(false);
  const [isRegImageBlurry, setIsRegImageBlurry] = useState(false);

  const [activePermissionInfo, setActivePermissionInfo] = useState<string | null>(null);

  const isLicenseComplete = licenseFile !== null && licenseNumber.trim() !== "" && licenseExpiry.trim() !== "";
  const isVehicleComplete = 
    vehicleFile !== null &&
    vehicleBrand.trim() !== "" && 
    vehicleModel.trim() !== "" && 
    vehicleColor.trim() !== "" && 
    plateNumber.trim() !== "" && 
    productionYear.toString().trim() !== "";
  const isRegistrationComplete = regPrimaryFile !== null && regExpiry.trim() !== "";

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const hasUploadedOptional = regOptionalFile !== null;

  const navigateTo = (nextScreen: string, dir: number) => {
    setDirection(dir);
    setScreen(nextScreen);
    setAnimKey((prev) => prev + 1); 
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!emailPattern.test(email) || !passwordPattern.test(password)) return;

    window.location.href = ROUTES.HOME;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviews((prev) => {
      if (prev[type]) URL.revokeObjectURL(prev[type]); 
      return { ...prev, [type]: previewUrl };
    });

    if (type === "license") {
      setLicenseFile(file);
      setIsLicenseImageBlurry(false); 
    } else if (type === "vehicle") {
      setVehicleFile(file);
      setIsVehicleImageBlurry(false);
    } else if (type === "regPrimary") {
      setRegPrimaryFile(file);
      setIsRegImageBlurry(false);
    } else if (type === "regOptional") {
      setRegOptionalFile(file);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "20px 15px",
      gap: 15,
      width: "100%",
      height: "calc(var(--vh) * 100)",
      overflow: "hidden",
      position: "relative",
      background: "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
    },
    noise: {
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
    main: {
      width: "100%",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    iconsx: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    iconx: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    content: {
      flex: 1,
      overflowY: "auto",
      position: "relative",
    },
    body1: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 12,
      marginTop: 15
    },
    body2: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 20,
      marginTop: 15
    },
    body3: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 20,
      marginTop: 15
    },
    body4: {
      position: "relative", 
      marginTop: 15,
      paddingLeft: 40, 
    },
    wrappers: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      cursor: "pointer",
    },
    wrapper: {
      width: "100%",
      borderRadius: 10,
      padding: "12px 15px",
      background: "rgba(255, 255, 255, 0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    circles: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      backgroundColor: "var(--red-100)",
      border: "1px dashed var(--red-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    circle: {
      width: 10,
      height: 10,
      color: "var(--red-300)",
    },
    arrow: {
      width: 18,
      height: 18,
      color: "var(--dark-200)",
    },
    boxs: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginTop: 10
    },
    box: {
      width: "100%",
      borderRadius: 10,
      padding: 8,
      background: "var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    input: {
      width: "100%",
      outline: "none",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-200)",
      padding: "12px 15px",
      border: "1px solid var(--light-100)",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    column: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 8,
    },
    initials: {
      width: 76,
      height: 76,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: 12,
      padding: 2,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      overflow: "hidden",
    },
    initial: {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    upload: {
      width: 20,
      height: 20,
      color: "var(--dark-200)",
      margin: "0 auto"
    },
    span: {
      position: "absolute",
      top: 2,
      left: 0,
      right: 22,
      textAlign: "center",
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    alerts: {
      width: "100%",
      outline: "none",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--red-300)",
      lineHeight: 1.6,
      textAlign: "justify",
      padding: "12px 15px",
      borderRadius: 12,
      backgroundColor: "var(--red-100)",
      border: "1px dashed var(--red-300)",
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    },
    alert: {
      width: 14,
      height: 14,
      color: "var(--red-300)",
      flexShrink: 0,
      marginTop: 3
    },
    lines: {
      width: "100%", 
      height: 6, 
      border: "1px solid var(--light-100)",
      borderRadius: 6,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "relative",
    },
    line: {
      position: "absolute", 
      left: 0, 
      height: "100%", 
      backgroundColor: "var(--dark-400)", 
      borderRadius: 6,
    },
    checks: {
      width: 56,
      height: 56,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 2,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      overflow: "hidden",
    },
    check: {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      overflow: "hidden",
    },
    iconc: {
      width: 24,
      height: 24,
      color: "var(--dark-200)",
    },
    value: {
      fontSize: 15,
      fontWeight: 500,
      color: "var(--dark-100)",
      marginBottom: -10
    },
    stroke: { 
      position: "absolute", 
      left: 10, 
      top: 20, 
      bottom: 20, 
      width: 1, 
      backgroundColor: "var(--light-100)" 
    },
    icons: {
      position: "absolute", 
      left: -40, 
      top: 0,
      background: "rgba(255, 255, 255, 0.55)",
      border: "1px solid var(--light-100)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "50%",
      width: 22,
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    titles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 2,
    },
    title: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    subtitle: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    infos: {
      width: "100%",
      outline: "none",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.6,
      textAlign: "justify",
      padding: "12px 15px",
      borderRadius: 12,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--light-100)",
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    },
    info: {
      width: 14,
      height: 14,
      color: "var(--dark-200)",
      flexShrink: 0,
      marginTop: 3
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    input1: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      padding: "8px 12px",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
    },
    label1: {
      fontSize: 11,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "uppercase",
      marginBottom: 2,
      letterSpacing: "0.5px"
    },
    value1: {
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 13,
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
    icon1: {
      width: 18,
      height: 18,
      color: "var(--dark-200)",
      cursor: "pointer",
    },
    arrows1: {
      backgroundColor: "var(--dark-200)", 
      border: "1px solid var(--dark-200)",
      width: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    arrow1: {
      width: 24,
      height: 24,
      color: "var(--light-200)",
      cursor: "pointer",
    },
  } as const;

  return (
    <motion.div key={animKey} style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noise} />

      <motion.div style={styles.main} variants={itemVariants}>
        <Box style={styles.iconsx} onClick={() => navigateTo("close", 1)}>
          <IconX style={styles.iconx} />
        </Box>
      </motion.div>

      <Box style={styles.content}>
        <AnimatePresence mode="wait" custom={direction}>
          {screen === "checklist" && (
            <motion.div style={styles.body1} key="checklist" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Box style={styles.wrappers} onClick={() => navigateTo("license", 1)}>
                <Box style={styles.wrapper}>
                  <Text style={styles.label}>Driver license</Text>
                  <Box style={styles.flex}>
                    <Box style={{
                      ...styles.circles,
                      backgroundColor: isLicenseComplete ? "var(--green-100)" : "var(--red-100)",
                      borderColor: isLicenseComplete ? "var(--green-300)" : "var(--red-300)"
                    }}>
                      {isLicenseComplete ? (
                        <IconCheck style={{ ...styles.circle, color: "var(--green-300)" }} />
                      ) : (
                        <IconX style={styles.circle} />
                      )}
                    </Box>
                    <IconChevronRight style={styles.arrow} />
                  </Box>
                </Box>
              </Box>

              <Box style={styles.wrappers} onClick={() => navigateTo("vehicleInfo", 1)}>
                <Box style={styles.wrapper}>
                  <Text style={styles.label}>Vehicle information</Text>
                  <Box style={styles.flex}>
                    <Box style={{
                      ...styles.circles,
                      backgroundColor: isVehicleComplete ? "var(--green-100)" : "var(--red-100)",
                      borderColor: isVehicleComplete ? "var(--green-300)" : "var(--red-300)"
                    }}>
                      {isVehicleComplete ? (
                        <IconCheck style={{ ...styles.circle, color: "var(--green-300)" }} />
                      ) : (
                        <IconX style={styles.circle} />
                      )}
                    </Box>
                    <IconChevronRight style={styles.arrow} />
                  </Box>
                </Box>
              </Box>

              <Box style={styles.wrappers} onClick={() => navigateTo("registration", 1)}>
                <Box style={styles.wrapper}>
                  <Text style={styles.label}>Vehicle registration certificate</Text>
                  <Box style={styles.flex}>
                    <Box style={{
                      ...styles.circles,
                      backgroundColor: isRegistrationComplete ? "var(--green-100)" : "var(--red-100)",
                      borderColor: isRegistrationComplete ? "var(--green-300)" : "var(--red-300)"
                    }}>
                      {isRegistrationComplete ? (
                        <IconCheck style={{ ...styles.circle, color: "var(--green-300)" }} />
                      ) : (
                        <IconX style={styles.circle} />
                      )}
                    </Box>
                    <IconChevronRight style={styles.arrow} />
                  </Box>
                </Box>
              </Box>

              <Box style={styles.boxs}>
                <Box style={styles.box} onClick={() => navigateTo("success", 1)}>Submit</Box>
              </Box>
            </motion.div>
          )}

          {screen === "license" && (
            <motion.div style={styles.body2} key="license" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">              
              <Box style={styles.column}>
                <Text style={styles.label}>Driver license</Text>
                <Box style={styles.initials} onClick={() => licenseInputRef.current?.click()}>
                  <Box style={styles.initial}>
                    {previews.license ? (
                      <img src={previews.license} alt="License Preview" style={styles.image} />
                    ) : (
                      <IconPlus stroke={2.5} style={styles.upload} />
                    )}
                  </Box>
                </Box>
                <input 
                  type="file" 
                  ref={licenseInputRef} 
                  style={{ display: "none" }} 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, "license")} 
                />
              </Box>

              {licenseFile && isLicenseImageBlurry && (
                <Box style={styles.alerts}>
                  <IconAlertCircle stroke={2.5} style={styles.alert} />
                  Please upload a clear picture of your driving licence. Make sure all details are easy to read
                </Box>
              )}

              <Box style={styles.column}>
                <Text style={styles.label}>License number</Text>
                <input
                  type="text"
                  placeholder="DL-9876543210"
                  value={licenseNumber} 
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  style={styles.input}
                />
              </Box>

              <Box style={styles.column}>
                <Text style={styles.label}>Expiration date</Text>
                <input
                  type="text"
                  placeholder="DD.MM.YYYY"
                  value={licenseExpiry} 
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                  style={styles.input}
                />
              </Box>
            </motion.div>
          )}

          {screen === "vehicleInfo" && (
            <motion.div style={styles.body2} key="vehicleInfo" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Box style={styles.column}>
                <Text style={styles.label}>Vehicle picture</Text>
                <Box style={styles.initials} onClick={() => vehicleInputRef.current?.click()}>
                  <Box style={styles.initial}>
                    {previews.vehicle ? (
                      <img src={previews.vehicle} alt="Vehicle Preview" style={styles.image} />
                    ) : (
                      <IconPlus stroke={2.5} style={styles.upload} />
                    )}
                  </Box>
                </Box>
                <input 
                  type="file" 
                  ref={vehicleInputRef} 
                  style={{ display: "none" }} 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, "vehicle")} 
                />
              </Box>

              {vehicleFile && isVehicleImageBlurry && (
                <Box style={styles.alerts}>
                  <IconAlertCircle stroke={2.5} style={styles.alert} />
                  Please upload a picture of your vehicle
                </Box>
              )}

              <Box style={styles.column}>
                <Text style={styles.label}>Vehicle brand</Text>
                <input
                  type="text"
                  placeholder="Toyota"
                  value={vehicleBrand} 
                  onChange={(e) => setVehicleBrand(e.target.value)}
                  style={styles.input}
                />
              </Box>

              <Box style={styles.column}>
                <Text style={styles.label}>Vehicle model</Text>
                <input
                  type="text"
                  placeholder="Camry"
                  value={vehicleModel} 
                  onChange={(e) => setVehicleModel(e.target.value)}
                  style={styles.input}
                />
              </Box>

              <Box style={styles.column}>
                <Text style={styles.label}>Vehicle color</Text>
                <input
                  type="text"
                  placeholder="Midnight Black"
                  value={vehicleColor} 
                  onChange={(e) => setVehicleColor(e.target.value)}
                  style={styles.input}
                />
              </Box>

              <Box style={styles.column}>
                <Text style={styles.label}>Plate number</Text>
                <input
                  type="text"
                  placeholder="ABC-123DE"
                  value={plateNumber} 
                  onChange={(e) => setPlateNumber(e.target.value)}
                  style={styles.input}
                />
              </Box>

              <Box style={styles.column}>
                <Text style={styles.label}>Production year</Text>
                <input
                  type="number"
                  placeholder="2024"
                  value={productionYear} 
                  onChange={(e) => setProductionYear(e.target.value)}
                  style={styles.input}
                />
              </Box>
            </motion.div>
          )}

          {screen === "registration" && (
            <motion.div style={styles.body2} key="registration" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Box style={styles.column}>
                <Text style={styles.label}>Vehicle registration</Text>
                <Box style={styles.flex}>
                  <Box style={styles.initials} onClick={() => regPrimaryInputRef.current?.click()}>
                    <Box style={styles.initial}>
                      {previews.regPrimary ? (
                        <img src={previews.regPrimary} alt="Registration Primary Preview" style={styles.image} />
                      ) : (
                        <IconPlus stroke={2.5} style={styles.upload} />
                      )}
                    </Box>
                  </Box>
                  <input 
                    type="file" 
                    ref={regPrimaryInputRef} 
                    style={{ display: "none" }} 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, "regPrimary")} 
                  />

                  <Box style={styles.initials} onClick={() => regOptionalInputRef.current?.click()}>
                    <Box style={styles.initial}>
                      <Text style={styles.span}>Optional</Text>
                      {previews.regOptional ? (
                        <img src={previews.regOptional} alt="Registration Optional Preview" style={styles.image} />
                      ) : (
                        <IconPlus stroke={2.5} style={{ ...styles.upload, marginTop: 12 }} />
                      )}
                    </Box>
                  </Box>
                  <input 
                    type="file" 
                    ref={regOptionalInputRef} 
                    style={{ display: "none" }} 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, "regOptional")} 
                  />
                </Box>
              </Box>

              {regPrimaryFile && isRegImageBlurry && (
                <Box style={styles.alerts}>
                  <IconAlertCircle stroke={2.5} style={styles.alert} />
                  The picture of your vehicle registration is not clear. Please upload a better quality picture
                </Box>
              )}

              <Box style={styles.column}>
                <Text style={styles.label}>Vehicle registration expiry</Text>
                <input
                  type="text"
                  placeholder="DD.MM.YYYY"
                  value={regExpiry} 
                  onChange={(e) => setRegExpiry(e.target.value)}
                  style={styles.input}
                />
              </Box>
              {hasUploadedOptional && <Box style={{ display: "none" }} />}
            </motion.div>
          )}

          {screen === "success" && (
            <motion.div style={styles.body3} key="success" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Box style={styles.checks}>
                <Box style={styles.check}>
                  <IconCheck stroke={2.5} style={styles.iconc} />
                </Box>
              </Box>
              <Text style={styles.value}>We will review and respond within 24 hours.</Text>
              <Text style={{ ...styles.label, color: "var(--dark-200)" }}>Applications are processed during working hours.</Text>
              <Box style={{ ...styles.boxs, marginTop: 0 }} onClick={() => navigateTo("permissions", 1)}>
                <Box style={styles.box}>Completed</Box>
              </Box>
            </motion.div>
          )}

          {screen === "timeline" && (
            <motion.div key="timeline" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Box style={styles.body4}>
                <Box style={styles.stroke} />
                <Box style={{ position: "relative", marginBottom: 32 }}>
                  <Box style={styles.icons}><IconCheck stroke={2.5} style={styles.icon} /></Box>
                  <Box style={styles.titles}>
                    <Text style={styles.title}>Documents submitted</Text>
                    <Text style={styles.subtitle}>We have all the info we need to verify you</Text>
                  </Box>
                </Box>
                <Box style={{ position: "relative", marginBottom: 32 }}>
                  <Box style={styles.icons}><IconCheck stroke={2.5} style={styles.icon} /></Box>
                  <Box style={styles.titles}>
                    <Text style={styles.title}>Set up access to ride requests</Text>
                    <Text style={styles.subtitle}>You'll be ready to accept ride requests right after verification</Text>
                  </Box>
                </Box>
                <Box style={{ position: "relative" }}>
                  <Box style={styles.icons}><IconPlayerPause stroke={2} style={styles.icon} /></Box>
                  <Box style={styles.titles}>
                    <Text style={styles.title}>Wait for verification result</Text>
                    <Text style={styles.subtitle}>We'll notify you within 24 hours</Text>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )}

          {screen === "permissions" && (
            <motion.div style={styles.body1} key="permissions" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Box style={styles.wrappers} onClick={() => setActivePermissionInfo(activePermissionInfo === "location" ? null : "location")}>
                <Box style={styles.wrapper}>
                  <Box style={{ ...styles.flex, gap: 10 }}>
                    <Box style={styles.circles}><IconX style={styles.circle} /></Box>
                    <Text style={styles.label}>Location</Text>  
                  </Box>
                  <IconChevronRight style={styles.arrow} />
                </Box>
              </Box>
              {activePermissionInfo === "location" && (
                <Box style={styles.infos}>
                  <IconAlertCircle stroke={2.5} style={styles.info} />
                  Go to Settings - Cruza<br />Turn on 'Allow display over other apps'.
                </Box>
              )}
              <Box style={styles.wrappers} onClick={() => setActivePermissionInfo(activePermissionInfo === "notifications" ? null : "notifications")}>
                <Box style={styles.wrapper}>
                  <Box style={{ ...styles.flex, gap: 10 }}>
                    <Box style={styles.circles}><IconX style={styles.circle} /></Box>
                    <Text style={styles.label}>Notifications</Text>  
                  </Box>
                  <IconChevronRight style={styles.arrow} />
                </Box>
              </Box>
              {activePermissionInfo === "notifications" && (
                <Box style={styles.infos}>
                  <IconAlertCircle stroke={2.5} style={styles.info} />
                  Go to Settings - Cruza<br />Turn on 'Allow notifications'.
                </Box>
              )}
              <Box style={styles.boxs} onClick={() => navigateTo("timeline", 1)}>
                <Box style={styles.box}>Done</Box>
              </Box>
            </motion.div>
          )}

          {screen === "finalWait" && (
            <motion.div key="finalWait" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <Text style={{ fontSize: 24, fontWeight: 700, color: "#ffffff", marginBottom: 32 }}>Wait for verification result</Text>
            </motion.div>
          )}

          {screen === "close" && (
            <motion.div key="close" custom={direction} variants={itemVariants} initial="hidden" animate="visible" exit="hidden">
              <form onSubmit={handleSubmit} style={styles.form}>
                <motion.div style={styles.input1} variants={itemVariants}>
                  <Text style={styles.label1}>Email</Text>
                  <input type="text" placeholder="example@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.value1} required />
                </motion.div>
                <motion.div style={styles.passwords} variants={itemVariants}>
                  <Box style={styles.password}>
                    <Text style={styles.label1}>Password</Text>
                    <Box style={styles.pass}>
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.value1} required />
                      <Box onClick={() => setShowPassword(!showPassword)} style={{ display: "flex", alignItems: "center" }}>
                        {showPassword ? <IconEyeOff style={styles.icon1} /> : <IconEye style={styles.icon1} />}
                      </Box>
                    </Box>
                  </Box>
                  <button type="submit" style={styles.arrows1}><IconArrowRight style={styles.arrow1} /></button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {screen !== "checklist" && screen !== "success" && screen !== "timeline" && screen !== "permissionsList" && screen !== "finalWait" && screen !== "close" && (
        <Box style={styles.boxs}>          
          <Box style={styles.box}>
            <IconChevronLeft
              stroke={2.5}
              style={styles.arrow}
              onClick={() => {
                if (screen === "license") navigateTo("checklist", -1);
                if (screen === "vehicleInfo") navigateTo("license", -1);
                if (screen === "registration") navigateTo("vehicleInfo", -1);
              }}
            />

            <Box style={styles.lines}>
              <Box style={{ ...styles.line, width: screen === "license" ? "33%" : screen === "vehicleInfo" ? "66%" : "100%" }} />
            </Box>

            <IconChevronRight
              stroke={2.5}
              style={styles.arrow}
              onClick={() => {
                if (screen === "license") navigateTo("vehicleInfo", 1);
                if (screen === "vehicleInfo") navigateTo("registration", 1);
                if (screen === "registration") navigateTo("success", 1);
              }}
            />
          </Box>
        </Box>
      )}
    </motion.div>
  );
};

export default Onboarding;