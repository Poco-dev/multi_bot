const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "", // Ваш ключ API от OpenRouter
});

async function getChatCompletion(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    if (completion.choices && completion.choices.length > 0) {
      return completion.choices[0].message.content;
    } else {
      return "haven't answers";
    }
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    return "Sorry, there was an error with processing your request.";
  }
}

module.exports = getChatCompletion; // Используем module.exports вместо export default
