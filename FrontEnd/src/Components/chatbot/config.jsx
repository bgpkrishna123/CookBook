import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hi! What are you craving?`)],
  botName:"Cook Bot"
};

export default config;