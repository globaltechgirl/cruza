import { FC, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";
import MapImage from "@/assets/map.jpg";
import CheckIcon from "@/assets/icons/checks";
import EditIcon from "@/assets/icons/edit";

type Props = {
  offerAccepted: boolean;
  setOfferAccepted: (v: boolean) => void;
};

type EditStatus = "idle" | "editing" | "upgraded";

const Card: FC<Props> = ({ offerAccepted, setOfferAccepted }) => {
  const styles = {
    wrappers: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 25,
    },
    wrapper: {
      position: "relative",
      width: "100%",
      minHeight: 450,
    },
    cards: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      border: "1px solid var(--light-100)",
      borderRadius: 15,
      padding: 2,
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      fontFamily: "Ticketing",
    },
    card: {
      width: "100%",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.25)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    },
    img: {
      width: "100%",
      height: 250,
      objectFit: "cover",
      objectPosition: "center",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottom: "1px dashed var(--dark-300)",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      gap: 25,
      padding: "12px 10px",
    },
    title: {
      fontSize: 12,
      fontWeight: 550,
      color: "var(--dark-200)",
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    middle: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 20,
      letterSpacing: 0.8,
    },
    side1: {
      flex: 0.5,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    amount: {
      fontSize: 20,
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    input: {
      fontSize: 20,
      fontWeight: 550,
      color: "var(--dark-100)",
      background: "none",
      border: "none",
      width: "100%",
      padding: "none",
      outline: "none",
      fontFamily: "Ticketing",
    },
    currency: {
      fontSize: 14,
      fontWeight: 400,
      color: "var(--dark-200)",
      textTransform: "lowercase",
      marginTop: -4,
    },
    side2: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      textTransform: "uppercase",
      gap: 6,
    },
    label: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-100)",
    },
    span: {
      fontWeight: 500,
      color: "var(--dark-200)",
      marginLeft: 4,
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    bottoms: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    tag: {
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    value: {
      fontSize: 16,
      fontWeight: 550,
      color: "var(--dark-100)",
    },
    values: {
      color: "var(--dark-200)",
      marginLeft: 1.5,
    },
    flex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    offer: {
      padding: "2px 8px",
      background: "var(--light-100)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
      cursor: "pointer",
      width: "fit-content",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },
    accept: {
      padding: "2px 8px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid var(--light-100)",
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 500,
      color: "var(--dark-200)",
      textTransform: "lowercase",
      cursor: "pointer",
      width: "fit-content",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },
    icon: {
      width: 10,
      height: 10,
      color: "var(--dark-200)",
    },
  } as const;

  const initialCards = [
    { title: "Ride to Babcock University", amount: "5,000", pickup: "Lekki Phase 1", dropoff: "Epe Expressway", pickupDate: "17 OCT, 2026", distance: "133,833", rideDay: "2", rideHour: "5", luggage: "2", members: "2" },
    { title: "Ride to Yaba", amount: "3,500", pickup: "Victoria Island", dropoff: "Yaba Bus Stop", pickupDate: "19 OCT, 2026", distance: "42,500", rideDay: "1", rideHour: "3", luggage: "1", members: "3" },
    { title: "Ride to Ikeja", amount: "4,200", pickup: "Lekki", dropoff: "Ikeja City Mall", pickupDate: "22 OCT, 2026", distance: "58,200", rideDay: "1", rideHour: "6", luggage: "2", members: "4" },
  ];

  const [cards, setCards] = useState(initialCards);
  const [active, setActive] = useState(0);
  const [editingState, setEditingState] = useState<EditStatus>("idle");

  useEffect(() => {
    setEditingState("idle");
  }, [active]);

  const handleEditClick = () => {
    if (editingState === "idle") {
      setEditingState("editing");
    } else if (editingState === "editing") {
      setEditingState("upgraded");
    }
  };

  const handleAmountChange = (index: number, value: string) => {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, amount: value } : c))
    );
  };

  return (
    <Box style={styles.wrappers}>
      <Box style={styles.wrapper}>
        {cards.map((card, index) => {
          if (offerAccepted) {
            if (index !== active) return null;
          } else {
            if (index < active || index > active + 1) return null;
          }

          return (
            <motion.div
              key={index}
              drag={!offerAccepted && index === active ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.9}
              dragMomentum={true}
              whileDrag={{ rotate: !offerAccepted && index === active ? 6 : 0, scale: 1.015, cursor: "grabbing", }}
              onDragEnd={(_, info) => {
                if (offerAccepted) return;
                const swipeThreshold = 100;
                if (info.offset.x < -swipeThreshold && active < cards.length - 1) { setActive(active + 1); return; }
                if (info.offset.x > swipeThreshold && active > 0) { setActive(active - 1); return; }
              }}
              initial={false}
              animate={{
                x: 0,
                scale: index === active ? 1 : 0.96,
                y: index === active ? 0 : 14,
                opacity: index === active ? 1 : 0.92,
                rotate: 0,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.8, }}
              style={{
                ...styles.cards,
                zIndex: cards.length - index,
                cursor: !offerAccepted && index === active ? "grab" : "default",
              }}
            >
              <Box style={styles.card}>
                <img src={MapImage} alt="map" style={styles.img} />

                <Box style={styles.body}>
                  <Text style={styles.title}>{card.title}</Text>

                  <Box style={styles.middle}>
                    <Box style={styles.side1}>
                      {editingState === "editing" && index === active ? (
                        <input
                          type="text"
                          inputMode="numeric"
                          value={card.amount}
                          onChange={(e) => { 
                            const value = e.target.value.replace(/\D/g, "");
                            handleAmountChange(index, value);
                          }}
                          style={styles.input}
                          autoFocus
                        />
                      ) : (
                        <Text style={styles.amount}>{card.amount}</Text>
                      )}
                      <Text style={styles.currency}>naira</Text>
                    </Box>

                    <Box style={styles.side2}>
                      <Text style={styles.label}>
                        Pickup <span style={styles.span}>{card.pickup}</span>
                      </Text>

                      <Text style={styles.label}>
                        Dropoff <span style={styles.span}>{card.dropoff}</span>
                      </Text>

                      <Text style={styles.label}>
                        Pickup Date <span style={styles.span}>{card.pickupDate}</span>
                      </Text>
                    </Box>
                  </Box>

                  <Box style={styles.bottom}>
                    <Box style={styles.bottoms}>
                      <Text style={styles.tag}>Distance</Text>
                      <Text style={styles.value}>
                        {card.distance}
                        <span style={{ ...styles.values, marginLeft: 6.5 }}>km</span>
                      </Text>
                    </Box>

                    <Box style={styles.bottoms}>
                      <Text style={styles.tag}>Ride Time</Text>
                      <Text style={styles.value}>
                        {card.rideDay}
                        <span style={styles.values}>d</span>{" "}
                        {card.rideHour}
                        <span style={styles.values}>h</span>
                      </Text>
                    </Box>

                    <Box style={styles.bottoms}>
                      <Text style={styles.tag}>Luggage</Text>
                      <Text style={styles.value}>{card.luggage}</Text>
                    </Box>

                    <Box style={styles.bottoms}>
                      <Text style={styles.tag}>Members</Text>
                      <Text style={styles.value}>{card.members}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>

      <Box style={styles.flex}>
        {!offerAccepted && (
          <Box style={styles.offer} onClick={handleEditClick}>
            {editingState !== "idle" && <CheckIcon style={styles.icon} />}
            {editingState == "idle" && <EditIcon style={styles.icon} />}
            <>
              {editingState === "idle" && "Edit Offer"}
              {editingState === "editing" && "Save Offer"}
              {editingState === "upgraded" && "Offer Upgraded"}
            </>
          </Box>
        )}

        <Box 
          style={offerAccepted ? styles.accept : styles.offer} 
          onClick={() => setOfferAccepted(true)}
        >
          <CheckIcon style={styles.icon} />
          {offerAccepted ? "Offer Accepted" : "Accept Offer"}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;