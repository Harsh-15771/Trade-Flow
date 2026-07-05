const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

const router = express.Router();
// Cache for 30 seconds to strictly prevent rate limiting from Finnhub (60 req/min limit)
const cache = new NodeCache({ stdTTL: 30 });

router.get("/quote/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Finnhub API Key is missing in backend" });
  }

  // Check if price is in cache
  if (cache.has(symbol)) {
    console.log(`[CACHE HIT] Returning cached price for ${symbol}`);
    return res.json(cache.get(symbol));
  }

  try {
    console.log(`[API CALL] Fetching live price for ${symbol} from Finnhub...`);
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );

    const data = response.data;
    
    // Finnhub returns an empty object or all zeroes if symbol is invalid/not found
    if (data && data.c !== 0) {
      cache.set(symbol, data); // Store in cache for 30s
      return res.json(data);
    } else {
      return res.status(404).json({ error: "Symbol not found or price is 0" });
    }
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error.message);
    return res.status(500).json({ error: "Failed to fetch live market data" });
  }
});

module.exports = router;
