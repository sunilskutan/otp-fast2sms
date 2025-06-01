require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpStore = {}; // temp in-memory OTP store

app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const message = `Your OTP is ${otp}`;

  try {
    const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", {
      route: "otp",
      variables_values: otp,
      numbers: phone,
    }, {
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
      }
    });

    otpStore[phone] = otp;
    res.json({ success: true, response: response.data });
  } catch (err) {
    console.error("Fast2SMS Error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] === otp) {
    delete otpStore[phone];
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OTP server running on port ${PORT}`));
