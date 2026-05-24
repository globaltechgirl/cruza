import { Box } from "@mantine/core";
import Main from "@/component/activity/main";
import { useState } from "react";

function Activity() {
  const [cardSwipe] = useState(false);
  
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Main cardSwipe={cardSwipe} />
    </Box>
  );
}

export default Activity;