import express from "express";
import axios from "axios";

const exchangeRouter = express();

exchangeRouter.post("/rate/:currencyCode", async (req,res)=>{
   try {
    const targetCurrency = req.params.currencyCode.toUpperCase();
    const API_KEY = process.env.EXCHANGE_API_KEY; // Replace with your real key
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    const response = await axios.get(BASE_URL);
    const rates = response.data.conversion_rates;
    const rate = rates[targetCurrency];

    if (!rate) {
      return res.status(404).json({ error: 'Currency not supported' });
    }

    res.json({ rate });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rate' });
  }

});

export default exchangeRouter;
