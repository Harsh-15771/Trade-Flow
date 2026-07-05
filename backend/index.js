require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { HoldingModel } = require("./Models/HoldingModels");
const { PositionModel } = require("./Models/PositionModels");
const { OrderModel } = require("./Models/OrderModels");
const authRoute = require("./Routes/AuthRoute");
const marketRoute = require("./Routes/MarketRoute");
const { verifyToken } = require("./Middlewares/AuthMiddleware");
const axios = require("axios");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyparser.json());

app.use("/auth", authRoute);
app.use("/market", marketRoute);

// app.get("/addholdings", async (req, res) => {
//   let tempHolding = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHolding.forEach((item) => {
//     let newHolding = new HoldingModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done");
// });

// app.get("/addpositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done");
// });

app.get("/allholdings", verifyToken, async (req, res) => {
  let allholdings = await HoldingModel.find({});
  res.json(allholdings);
});

app.get("/allpositions", verifyToken, async (req, res) => {
  let allpositions = await PositionModel.find({});
  res.json(allpositions);
});

app.get("/allorders", verifyToken, async (req, res) => {
  let allorders = await OrderModel.find({});
  res.json(allorders);
});

app.post("/newOrder", verifyToken, async (req, res) => {
  try {
    let { name, qty, mode } = req.body;
    qty = Number(qty);

    let price = 0;
    try {
      const apiKey = process.env.FINNHUB_API_KEY;
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${name}&token=${apiKey}`
      );
      if (response.data && response.data.c !== 0) {
        price = response.data.c;
      } else {
        return res.status(400).json({ error: "Invalid symbol or market data unavailable" });
      }
    } catch (err) {
      console.error("Failed to fetch live price for order:", err.message);
      return res.status(500).json({ error: "Failed to verify market price" });
    }

    if (mode === "SELL") {
      let holding = await HoldingModel.findOne({ name: name });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ error: "Insufficient quantity in holdings to sell." });
      }

      holding.qty -= qty;
      if (holding.qty === 0) {
        await HoldingModel.deleteOne({ name: name });
      } else {
        await holding.save();
      }
    } else if (mode === "BUY") {
      let holding = await HoldingModel.findOne({ name: name });
      if (holding) {
        let totalVal = (holding.qty * holding.avg) + (qty * price);
        holding.qty += qty;
        holding.avg = totalVal / holding.qty;
        await holding.save();
      } else {
        let newHolding = new HoldingModel({
          name: name,
          qty: qty,
          avg: price,
          price: price,
          net: "0.00%",
          day: "0.00%",
        });
        await newHolding.save();
      }
    }

    let newOrder = new OrderModel({
      name: name,
      qty: qty,
      price: price,
      mode: mode,
    });
    await newOrder.save();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("App started");
    mongoose.connect(uri).then(() => console.log("DB connected")).catch(console.error);
  });
}

module.exports = app;
