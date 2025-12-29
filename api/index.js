import axios from "axios";

export default async function handler(req, res) {
  try {
    const page = req.query.page || 1;

    const response = await axios.get("https://hadithapi.com/api/hadiths", {
      params: {
        apiKey: process.env.HADITH_API_KEY,
        limit: 300,
        page,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Hadith API Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch hadiths",
    });
  }
}
