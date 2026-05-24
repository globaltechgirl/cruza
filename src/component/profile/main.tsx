import { FC, useEffect, useRef, useState } from "react";
import { Box, Image, Select, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import UserImg from "@/assets/user.jpg";
import CircleIcon from "@/assets/icons/circle";
import CameraIcon from "@/assets/icons/camera";

const containerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
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

const menusVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 22,
    },
  },
};

interface ProfileProps {
  isVisible?: boolean;
}

const Profile: FC<ProfileProps> = ({ isVisible = true }) => {
  const [animKey, setAnimKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isReadOpen, setIsReadOpen] = useState(false);

  const [name, setName] = useState("Daniel Smith");
  const [email, setEmail] = useState("danielsmith@gmail.com");
  const [phone, setPhone] = useState("01234567890");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("Lagos");
  const [university, setUniversity] = useState("Babcock University");
  const [studentId, setStudentId] = useState("2023123456");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileSrc, setProfileSrc] = useState<string>(UserImg);
  const [profileObjectUrl, setProfileObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (profileObjectUrl) URL.revokeObjectURL(profileObjectUrl);
    };
  }, [profileObjectUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    if (profileObjectUrl) URL.revokeObjectURL(profileObjectUrl);
    setProfileObjectUrl(url);
    setProfileSrc(url);
  };

  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      borderRadius: "14px 14px 0 0",
      border: "1px solid var(--light-100)",
      gap: 15,
      padding: "20px 15px 15px 15px",
      overflowY: "auto",      
      scrollbarWidth: "none",   
      msOverflowStyle: "none",  
      position: "relative",
      background: "linear-gradient(135deg, var(--light-200) 0%, var(--light-200) 50%, var(--light-200) 100%)",
    },
    noiseOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      filter: "url(#noiseFilter)",
      opacity: 0.2,
    },
    top: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    nav1: {
      background: "rgba(255, 255, 255, 0.55)",
      border: "1px solid var(--light-100)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "50%",
      width: 20,
      height: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: 18,
      height: 18,
      color: "var(--red-300)",
    },
    menus: {
      position: "relative",
    },
    menu: {
      position: "absolute",
      top: 28,
      left: 0,
      width: 130,
      padding: 4,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      zIndex: 100,
    },
    logout: {
      padding: "3px 10px",
      background: "rgba(255, 255, 255, 0.55)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      borderRadius: 14,
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
      cursor: "pointer",
      width: "fit-content",
    },
    delete: {
      padding: "3px 10px",
      background: "rgba(255, 255, 255, 0.55)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      borderRadius: 14,
      fontSize: 11,
      fontWeight: 500,
      color: "var(--red-300)",
      cursor: "pointer",
      width: "fit-content",
    },
    nav2: {
      padding: "3px 10px",
      background: "rgba(255, 255, 255, 0.55)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      borderRadius: 14,
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
      cursor: "pointer",
      width: "fit-content",
    },
    iconx: {
      width: 12,
      height: 12,
      color: "var(--dark-200)",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      width: "100%",
    },
    initials: {
      width: 70,
      height: 70,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 2,
      display: "flex",
      alignItems: "center",
      position: "relative",
    },
    initial: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "cover",
      objectPosition: "top",
    },
    edits: {
      position: "absolute",
      right: 0,
      bottom: 0,
      width: 18,
      height: 18,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 3,
    },
    edit: {
      width: 10.5,
      height: 10.5,
      color: "var(--dark-200)",
    },
    titles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    },
    title: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--dark-100)",
      textTransform: "capitalize",
    },
    subtitle: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
    },
    wrappers: {
      width: "100%",
      border: "1px solid var(--light-100)",
      borderRadius: 10,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      marginTop: 10,
    },
    wrapper: {
      width: "100%",
      borderRadius: 8,
      padding: 10,
      background: "rgba(255, 255, 255, 0.25)",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      gap: 6,
    },
    value: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    label: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    input: {
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-200)",
      padding: 0,
      textAlign: "right",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 10,
    },
    read: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3px 10px",
      borderRadius: 14,
      background: "rgba(255, 255, 255, 0.55)",
      border: "1px solid var(--light-100)",
      cursor: "pointer",
      color: "var(--dark-200)",
      fontSize: 11,
      fontWeight: 500,
      textTransform: "lowercase"
    },
    selectStyles: {
      root: {
        width: "auto",
        marginLeft: "auto",
        padding: 0,
        height: 5,
        marginTop: -35,
      },
      input: {
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: 12,
        fontWeight: 500,
        color: "var(--dark-200)",
        textAlign: "right",
        width: 120,
      },
      dropdown: {
        background: "rgba(255, 255, 255, 1)",
        border: "1px solid var(--light-100)",
        borderRadius: 10,
        overflow: "hidden",
        backdropFilter: "blur(14px)",
        width: 120,
        padding: 2,
      },
      option: {
        fontSize: 12,
        fontWeight: 500,
        color: "var(--dark-200)",
        padding: "5px 10px",
        borderRadius: 8,
      },
    },
  } as const;

  const legalDocs = [
    {
      title: "Terms of Use",
      content: `Welcome to our platform. By accessing or using our services, you agree to comply with these Terms of Use. 
      You must not misuse our services, and you are responsible for any content you submit. 
      We reserve the right to modify or terminate the service at any time.`,
    },
    {
      title: "Privacy Policy",
      content: `We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information. 
      We only use your data to improve our services and will never sell your information to third parties. 
      By using our services, you consent to the collection and use of your data as described here.`,
    },
    {
      title: "Licenses",
      content: `All content, software, and materials provided on this platform are protected under copyright and intellectual property laws. 
      You may not copy, modify, distribute, or create derivative works without prior written permission. 
      Some third-party components may have their own licensing terms.`,
    },
  ];

  return (
    <motion.div key={animKey} style={styles.container} variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} exit="exit">
      <svg style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
      </svg>

      <Box style={styles.noiseOverlay} />

      <motion.div style={styles.top} variants={itemVariants}>
        <Box style={styles.menus}>
          <Box style={styles.nav1} onClick={() => setIsMenuOpen((prev) => !prev)}>
            <CircleIcon style={styles.icon} />
          </Box>

          {isMenuOpen && (
            <motion.div style={styles.menu} variants={menusVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.div style={styles.logout} variants={menuVariants} onClick={() => { setIsMenuOpen(false); }}>
                Logout
              </motion.div>

              <motion.div style={styles.delete} variants={menuVariants} onClick={() => {setIsMenuOpen(false); }}>
                Delete Account
              </motion.div>
            </motion.div>
          )}
        </Box>

        <Box
          onClick={() => {
            if (isReadOpen) {
              setIsReadOpen(false);
              setAnimKey(prev => prev + 1);
            } else {
              setIsEditing((prev) => !prev);
            }
          }}
        >
          {isReadOpen ? (
            <Box style={styles.nav1}>
              <IconX style={styles.iconx} />
            </Box>
          ) : (
            <Box style={styles.nav2}>
              <Text style={styles.label}>{isEditing ? "Save" : "Edit"}</Text>
            </Box>
          )}
        </Box>
      </motion.div>

      <Box style={styles.info}>
        <motion.div style={styles.initials} variants={itemVariants}>
          <Image src={profileSrc} alt="Profile" style={styles.initial} />
          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <Box style={styles.edits} onClick={() => fileInputRef.current?.click()}>
                <CameraIcon style={styles.edit} />
              </Box>
            </>
          )}
        </motion.div>

        <motion.div style={styles.titles} variants={itemVariants}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>@danielsmith</Text>
        </motion.div>
      </Box>

      <Box style={styles.body}>
        {!isReadOpen && (
          <>
            <motion.div style={styles.wrappers} variants={itemVariants}>
              <Box style={styles.wrapper}>
                <Box style={styles.row}>
                  <Text style={styles.value}>Name</Text>
                  {isEditing ? (
                    <input
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      style={styles.input}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.label}>{name}</Text>
                  )}
                </Box>

                <Box style={styles.row}>
                  <Text style={styles.value}>Email</Text>
                  {isEditing ? (
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      style={styles.input}
                      autoFocus
                    />
                  ) : (
                    <Text style={{ ...styles.label, textTransform: "lowercase" }}>
                      {email}
                    </Text>
                  )}
                </Box>

                <Box style={styles.row}>
                  <Text style={styles.value}>Phone</Text>
                  {isEditing ? (
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.currentTarget.value)}
                      style={styles.input}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.label}>{phone}</Text>
                  )}
                </Box>

                <Box style={styles.row}>
                  <Text style={styles.value}>Gender</Text>
                  {isEditing ? (
                    <Select
                      data={["Male", "Female"]}
                      value={gender}
                      onChange={(value) => setGender(value || "")}
                      styles={styles.selectStyles}
                    />
                  ) : (
                    <Text style={styles.label}>{gender}</Text>
                  )}
                </Box>

                <Box style={styles.row}>
                  <Text style={styles.value}>Location</Text>
                  {isEditing ? (
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.currentTarget.value)}
                      style={styles.input}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.label}>{location}</Text>
                  )}
                </Box>

                <Box style={styles.row}>
                  <Text style={styles.value}>University</Text>
                  {isEditing ? (
                    <input
                      value={university}
                      onChange={(e) => setUniversity(e.currentTarget.value)}
                      style={styles.input}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.label}>{university}</Text>
                  )}
                </Box>

                <Box style={styles.row}>
                  <Text style={styles.value}>Student ID</Text>
                  {isEditing ? (
                    <input
                      value={studentId}
                      onChange={(e) => setStudentId(e.currentTarget.value)}
                      style={styles.input}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.label}>{studentId}</Text>
                  )}
                </Box>
              </Box>
            </motion.div>

            <motion.div style={styles.wrappers} variants={itemVariants}>
              <Box style={styles.wrapper}>
                <Box style={styles.row}>
                  <Text style={styles.value}>Legal Documents</Text>
                  <Box
                    style={styles.read}
                    onClick={() => { setIsReadOpen(true); setIsEditing(false); }}
                  >
                    <Text style={styles.label}>Read File</Text>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </>
        )}

        {isReadOpen && (
          <Box style={styles.wrappers}>
            <Box style={styles.wrapper}>
              {legalDocs.map((doc) => (
                <Box key={doc.title} style={styles.box}>
                  <Text style={styles.value}>{doc.title}</Text>
                  <Text style={{ ...styles.label, lineHeight: 1.8, textAlign: "justify", }}>
                    {doc.content}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default Profile;