require("dotenv").config();

const app = require("./src/app");

// Yahan PORT dynamic kar diya hai
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});