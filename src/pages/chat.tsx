import { Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import Main from "@/component/chat/main";
import { useState } from "react";

function Chat() {
  const [chatOpen, setChatOpen] = useState(true);
  const navigate = useNavigate();

  const handleChatClose = () => {
    setChatOpen(false);
    navigate(ROUTES.RIDE);
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {chatOpen && <Main onClose={handleChatClose} />}
    </Box>
  );
}

export default Chat;
