require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Self-ping to prevent Render free tier sleep
  if (process.env.NODE_ENV === "production" || process.env.RENDER) {
    const https = require("https");
    const url = process.env.RENDER_EXTERNAL_URL || "https://ai-code-reviewer-hppy.onrender.com";

    setInterval(() => {
      https.get(url, (res) => {
        console.log(`Self-ping status: ${res.statusCode}`);
      }).on("error", (err) => {
        console.log("Self-ping error:", err.message);
      });
    }, 10 * 60 * 1000); // 10 minutes
  }
});