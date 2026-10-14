const { GOOGLEGENERATIVEAI } = require("@google/generative-ai");

const genAI = new GOOGLEGENERATIVEAI("process.env.GOOGLE_GEMINI_KEY");

const model = genAI.getGENERATIVEModel({ model: "gemini-2.0-flash" });

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = {
  generateContent,
};