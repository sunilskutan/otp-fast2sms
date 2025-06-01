const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Fast2SMS OTP API is running!");
});

// your existing OTP route
app.post("/send-otp", (req, res) => {
  // handle sending OTP
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
