import { FC, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Box, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import UserImg from "@/assets/user.jpg";
import SendIcon from "@/assets/icons/send";
import CallIcon from "@/assets/icons/call";
import CheckIcon from "@/assets/icons/checks";

type Message = {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
  date: Date;
};

const isSameDay = (dateA: Date, dateB: Date) =>
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

const isToday = (date: Date) => isSameDay(date, new Date());

const isYesterday = (date: Date) => {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  return isSameDay(date, yesterdayDate);
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatGroupLabel = (date: Date) => {
  if (isToday(date)) {
    return `Today ${formatTime(date)}`;
  }

  if (isYesterday(date)) {
    return `Yesterday ${formatTime(date)}`;
  }

  return `${date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  })} ${formatTime(date)}`;
};

const formatDailyGroupLabel = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

type Props = {
  onClose: () => void;
};

const Chat: FC<Props> = ({ onClose }) => {
  const styles = {
    container: {
      flex: 1,
      minHeight: 0,
      width: "100%",
      height: "calc(var(--vh) * 100)",
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
      flex: "0 0 auto",
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
      cursor: "pointer",
    },
    icon: {
      width: 11,
      height: 11,
      color: "var(--dark-200)",
    },
    users: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    imagesu: {
      width: 40,
      height: 40,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 2,
      display: "flex",
      alignItems: "center",
    },
    imageu: {
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
    title: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--dark-100)",
      textTransform: "capitalize",
    },
    chat: {
      display: "flex",
      flexDirection: "column",
      gap: 25,
      flex: 1,
      overflowY: "auto",
    },
    label: {
      alignSelf: "center",
      backgroundColor: "transparent",
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    wrapper1: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 14,
    },
    box1: {
      display: "flex",
      alignItems: "flex-end",
      gap: 10,
    },
    bubble1: {
      position: "relative",
      display: "inline-block",
      maxWidth: "80%",
    },
    groups: {
      display: "flex",
      alignItems: "flex-end",
      gap: 10,
    },
    group: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
    },
    left: {
      backgroundColor: "var(--light-100)",
      padding: "8px 12px",
      borderRadius: 15,
      width: "100%",
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
      lineHeight: 1.6,
    },
    circle1: {
      position: "absolute",
      width: 13,
      height: 13,
      borderRadius: "50%",
      backgroundColor: "var(--light-100)",
      left: -3,
      bottom: -2,
    },
    images: {
      width: 25,
      height: 25,
      flexShrink: 0,
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: "50%",
      padding: 1,
      display: "flex",
      alignItems: "center",
      marginBottom: -3,
    },
    image: {
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
    wrapper2: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      gap: 14,
    },
    bubble2: {
      position: "relative",
      display: "inline-block",
      marginRight: 5,
      maxWidth: "80%",
    },
    right: {
      backgroundColor: "var(--dark-200)",
      marginLeft: "auto",
      padding: "8px 12px",
      borderRadius: 15,
      width: "100%",
      fontSize: 11,
      fontWeight: 500,
      color: "var(--light-100)",
      lineHeight: 1.6,
    },
    circle2: {
      position: "absolute",
      width: 13,
      height: 13,
      borderRadius: "50%",
      backgroundColor: "var(--dark-200)",
      right: -3,
      bottom: -2,
    },
    bottom: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    message: {
      flex: 1,
      padding: "10px 16px",
      backgroundColor: "var(--light-200)",
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    messageText: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    input: {
      width: "100%",
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    iconsm: {
      padding: 8,
      backgroundColor: "var(--dark-200)",
      borderRadius: "50%",
    },
    iconm: {
      width: 16,
      height: 16,
      color: "var(--light-100)",
      transform: "rotate(-45deg)",
    },
  } as const;

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(14, 1, 0, 0);

  const todayDate = new Date(now);
  todayDate.setHours(1, 15, 0, 0);

  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "other",
      text: "We're locking in plans for the island getaway. Can you send your share tonight?",
      time: "Yesterday 14:01 PM",
      date: yesterday,
    },
    {
      id: 2,
      sender: "me",
      text: "Just sorted it. Please confirm if the others will be going.",
      time: "Today 01:15 AM",
      date: todayDate,
    },
  ]);

  const chatItems = useMemo(() => {
    type GroupItem = {
      type: "group";
      sender: "me" | "other";
      label: string;
      time: Date;
      messages: Message[];
    };

    const items: GroupItem[] = [];
    let currentGroup: GroupItem | null = null;
    let currentGroupKey: string | null = null;

    messages.forEach((msg) => {
      const groupKey =
        msg.sender === "other"
          ? `${msg.date.toDateString()}-${msg.date.getHours()}-other`
          : `${msg.date.toDateString()}-me`;

      if (currentGroup && currentGroupKey === groupKey) {
        currentGroup.messages.push(msg);
      } else {
        currentGroup = {
          type: "group",
          sender: msg.sender,
          label:
            msg.sender === "other"
              ? formatGroupLabel(msg.date)
              : formatDailyGroupLabel(msg.date),
          time: msg.date,
          messages: [msg],
        };
        currentGroupKey = groupKey;
        items.push(currentGroup);
      }
    });

    return items;
  }, [messages]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const [copied, setCopied] = useState(false);

  const phoneNumber = "+1 234 567 8901";

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Copy failed", error);
    }
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "me",
        text: trimmed,
        time,
        date: now,
      },
    ]);
    setMessage("");
    setIsTyping(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

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
          <Box style={styles.icons} onClick={onClose}>
            <IconX style={styles.icon} />
          </Box>

          <Box style={styles.users}>
            <Box style={styles.imagesu}>
              <img src={UserImg} style={styles.imageu} />
            </Box>
            <Text style={styles.title}>John Dorwart</Text>
          </Box>

          <Box style={styles.icons} onClick={handleCopyPhone}>
            {copied ? (
              <CheckIcon style={styles.icon} />
            ) : (
              <CallIcon style={styles.icon} />
            )}
          </Box>
        </Box>

        <Box style={styles.chat}>
          {chatItems.map((item) => (
            <Box
              key={`group-${item.time.toISOString()}-${item.sender}`}
              style={item.sender === "me" ? styles.wrapper2 : styles.wrapper1}
            >
              <Text style={styles.label}>{item.label}</Text>
              
              {item.sender === "other" ? (
                <Box style={styles.groups}>
                  <Box style={styles.box1}>
                    <Box style={styles.images}>
                      <img src={UserImg} style={styles.image} />
                    </Box>
                  </Box>

                  {item.messages.map((msg) => (
                    <Box key={msg.id} style={styles.group}>
                      <Box style={styles.bubble1}>
                        <Box style={styles.left}>{msg.text}</Box>
                        <Box style={styles.circle1} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                item.messages.map((msg) => (
                  <Box key={msg.id} style={styles.bubble2}>
                    <Box style={styles.right}>{msg.text}</Box>
                    <Box style={styles.circle2} />
                  </Box>
                ))
              )}
            </Box>
          ))}
          <Box ref={scrollRef} />
        </Box>

        <Box style={styles.bottom}>
          <Box style={styles.message} onClick={() => setIsTyping(true)}>
            {isTyping ? (
              <input
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsTyping(false)}
                style={styles.input}
                placeholder="Type a message..."
              />
            ) : (
              <Text style={styles.messageText}>Type a message...</Text>
            )}
          </Box>

          <Box style={styles.iconsm} onClick={handleSend}>
            <SendIcon style={styles.iconm} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;