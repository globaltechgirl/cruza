import { FC, useState } from "react";
import { Box, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface Props {
  onChange: (value: string) => void;
}

const Scheduler: FC<Props> = ({ onChange }) => {
  const styles = {
    popup: {
      width: "100%",
      overflow: "hidden",
    },
    main: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    boxs: {
      width: "100%",
      backgroundColor: "var(--light-100)",
      border: "1px dashed var(--dark-300)",
      borderRadius: 12,
      padding: 2,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    box: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--light-200)",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
      padding: 6,
    },
    selector: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    select: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    icon: {
      width: 14,
      height: 14,
      color: "var(--dark-200)",
    },
    center: {
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    title: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 12,
      justifyItems: "center",
      textAlign: "center",
    },
    text: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    span: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--dark-200)",
    },
    active: {
      backgroundColor: "var(--light-200)",
      padding: "2px 5px",
      borderRadius: 6,
      color: "var(--dark-200)",
    },
  } as const;

  const [activePicker, setActivePicker] = useState<"none" | "date" | "time">( "none" );

  const [month, setMonth] = useState("February");
  const [year, setYear] = useState(2026);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  const monthIndex = months.indexOf(month);

  const getDays = (year: number, monthIndex: number) =>
    new Array(new Date(year, monthIndex + 1, 0).getDate()) .fill(0) .map((_, i) => i + 1);

  const days = getDays(year, monthIndex);

  const mainDateDisplay = selectedDate ? `${months[monthIndex]} ${selectedDate}, ${year}` : "Select Date";
  const mainTimeDisplay = selectedTime ?? "Select Time";

  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const handleSelectDate = (day: number) => {
    setSelectedDate(day);
    setActivePicker("time");
  };

  const handlePrevMonth = () => {
    const idx = months.indexOf(month);
    if (idx === 0) {
      setMonth(months[11]);
      setYear((y) => y - 1);
    } else setMonth(months[idx - 1]);
  };

  const handleNextMonth = () => {
    const idx = months.indexOf(month);
    if (idx === 11) {
      setMonth(months[0]);
      setYear((y) => y + 1);
    } else setMonth(months[idx + 1]);
  };

  return (
    <Box style={styles.popup}>
      {activePicker === "none" && (
        <Box style={styles.main}>
          <Box style={styles.boxs} onClick={() => setActivePicker("date")}>
            <Box style={styles.box}>{mainDateDisplay}</Box>
          </Box>

          <Box style={styles.boxs} onClick={() => setActivePicker("time")}>
            <Box style={styles.box}>{mainTimeDisplay}</Box>
          </Box>
        </Box>
      )}

      {activePicker === "date" && (
        <Box style={styles.selector}>
          <Box style={styles.select}>
            <IconChevronLeft onClick={handlePrevMonth} style={styles.icon} />

            <Box style={styles.center}>
              <Text style={styles.title}>{month}</Text>
              <Text style={styles.title}>{year}</Text>
            </Box>

            <IconChevronRight onClick={handleNextMonth} style={styles.icon} />
          </Box>

          <Box style={styles.grid}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <Text key={d} style={styles.text}>{d}</Text>
            ))}

            {days.map((d) => {
              const isSelected = selectedDate === d;
              const isHovered = hoveredDate === d;

              return (
                <Text
                  key={d}
                  style={{ ...styles.span, ...(isSelected ? styles.active : {}), ...(isHovered ? styles.active : {}), }}
                  onClick={() => handleSelectDate(d)}
                  onMouseEnter={() => setHoveredDate(d)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {d}
                </Text>
              );
            })}
          </Box>
        </Box>
      )}

      {activePicker === "time" && (
        <Box style={styles.selector}>
          <Box style={{ ...styles.grid, gridTemplateColumns: "repeat(6, 1fr)" }}>
            {Array.from({ length: 24 }, (_, i) => {
              const time = `${i.toString().padStart(2, "0")}:00`;
              const isSelected = selectedTime === time;

              return (
                <Text
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  style={{ ...styles.span, ...(isSelected ? styles.active : {}), cursor: "pointer", }}
                >
                  {time}
                </Text>
              );
            })}
          </Box>

          <Box style={styles.main}>
            <Box onClick={() => setActivePicker("none")} style={styles.boxs}>
              <Box style={styles.box}>Back</Box>
            </Box>
            <Box
              style={styles.boxs}
              onClick={() => {
                if (selectedDate != null && selectedTime) {
                  const full = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
                    selectedDate
                  ).padStart(2, "0")}T${selectedTime}`;
                  onChange(full);
                }
              }}
            >
              <Box style={styles.box}>Confirm</Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Scheduler;