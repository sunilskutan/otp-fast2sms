const express = require('express');
const cors = require('cors'); // ✅ Add this
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // ✅ Enable CORS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Fast2SMS OTP API is running!");
});

app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, error: "Phone number is required" });

  // 🔧 Replace this with actual Fast2SMS logic or testing stub
  console.log(`OTP sent to ${phone}`);
  
  res.json({ success: true, message: `OTP sent to ${phone}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
