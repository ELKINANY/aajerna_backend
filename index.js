import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/**
 * Proxy endpoint for Hadith API
 */
app.get("/api/hadiths", async (req, res) => {
  try {
    const response = await axios.get("https://hadithapi.com/api/hadiths", {
      params: {
        apiKey: process.env.HADITH_API_KEY,
        limit: 300,
        page: req.query.page || 1,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Hadith API Error:", error.message);
    res.status(500).json({ message: "Failed to fetch hadiths" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
