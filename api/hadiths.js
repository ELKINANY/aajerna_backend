import axios from "axios";

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // مهم للـ preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch hadiths" });
  }
}
