const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Fast2SMS OTP API is running!");
});

app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number is required" });

  // your Fast2SMS logic here...
  
  res.json({ message: `OTP sent to ${phone}` });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
