import React from "react";
import axios from "axios";

const getResponse = async (message) => {
  const res = await axios.post("http://localhost:7700/gemini", {
    message,
  });
  return res;
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = async (message) => {
    const response = await getResponse(message);
    const botMessage = createChatBotMessage(response.data);

    setState((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, botMessage],
      };
    });
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
