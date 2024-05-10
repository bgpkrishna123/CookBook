const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiRouter = require("express").Router();

const api_key = process.env.gemini_api;
const genAI = new GoogleGenerativeAI(api_key);

geminiRouter.post("/", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [],
  });
  const message = req.body.message;
  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});

module.exports = { geminiRouter };
