const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  try {
    const base64 = req.file.buffer.toString("base64");
    const imgbbApiKey = process.env.IMGBB_API_KEY;
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      new URLSearchParams({ image: base64 }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return res.json({ url: response.data.data.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
