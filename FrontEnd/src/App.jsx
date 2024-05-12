import "./App.css";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { AllRoutes } from "./routes/AllRoutes";
import config from "./Components/chatbot/config";
import MessageParser from "./Components/chatbot/MessageParser";
import ActionProvider from "./Components/chatbot/ActionProvider";
import { Avatar, Box, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import chatbot from "./assets/chatbot.png";
import { CloseIcon } from "@chakra-ui/icons";
function App() {
  const [bot, setBot] = useState(false);
 
  return (
    <>
      <Box position="relative">
        <Box position="fixed" right="20px" zIndex="1" bottom="20px">
          {!bot ? (
            <Avatar
              size="lg"
              src={chatbot}
              onClick={() => {
                setBot(true);
              }}
              cursor="pointer"
            />
          ) : (
            <Box position="relative">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
              <CloseIcon
                position="fixed"
                bottom="490px"
                right="35px"
                color="#3182CE"
                cursor="pointer"
                onClick={() => {
                  setBot(false);
                }}
              />
            </Box>
          )}
        </Box>
        <AllRoutes />
      </Box>
    </>
  );
}

export default App;
