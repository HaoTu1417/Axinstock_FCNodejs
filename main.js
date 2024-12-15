/** @START_CONFIG */

const express = require("express");
const config = require("./config.js");
const redis = require("./redis.js");
const client = require("ssi-fcdata");
const axios = require("axios");
const { WebSocketServer } = require("ws");
const app = express();
const port = 3020;
/** @END_CONFIG */

// const baseStockObject = {
//   id: 2100,
//   sym: "VCB",
//   mc: "10",
//   c: 98.1,
//   f: 85.3,
//   r: 91.7,
//   lastPrice: 91,
//   lastVolume: 22510,
//   lot: 187490,
//   ot: "0.70",
//   changePc: "0.76",
//   avePrice: "91.41",
//   highPrice: "92.30",
//   lowPrice: "90.90",
//   fBVol: "53250",
//   fBValue: "0",
//   fSVolume: "100931",
//   fSValue: "0",
//   fRoom: "375989265",
//   g1: "90.90|3470|d",
//   g2: "90.80|2650|d",
//   g3: "90.70|2070|d",
//   g4: "91.00|8050|d",
//   g5: "91.50|220|d",
//   g6: "91.70|450|e",
//   g7: "0|0|e",
//   mp: "0%",
//   CWUnderlying: "        ",
//   CWIssuerName: "                         ",
//   CWType: " ",
//   CWMaturityDate: "        ",
//   CWLastTradingDate: "        ",
//   CWExcersisePrice: "0.000",
//   CWExerciseRatio: "           ",
//   CWListedShare: "1294123966.00",
//   sType: "S",
//   sBenefit: "0",
// };

const baseStockObject = {
  stock_name: "",
  exchange: "HOSE",
  updateTime: "2024-12-13T09:15:01",
  is_enabled: 1,
  prev_day_c: 0,
  prev_day_v: 0,
  day_o: 0,
  day_h: 0,
  day_l: 0,
  day_c: 0,
  day_v: 0,
  price: 0,
  bids: [],
  asks: [],
  bid_sizes: [],
  ask_sizes: [],
  ceiling: 0,
  floor: 0,
};

app.get("/Securities", (req, res) => {
  let lookupRequest = {};
  lookupRequest.market = "HOSE";
  lookupRequest.pageIndex = 4;
  lookupRequest.pageSize = 100;
  Object.assign(lookupRequest, req.query);

  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_SECURITIES_LIST +
        "?lookupRequest.market=" +
        lookupRequest.market +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/SecuritiesDetails", (req, res) => {
  let lookupRequest = {};
  lookupRequest.market = "DER";
  lookupRequest.symbol = "";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_SECURITIES_DETAILs +
        "?lookupRequest.market=" +
        lookupRequest.market +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize +
        "&lookupRequest.symbol=" +
        lookupRequest.symbol
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/IndexComponents", (req, res) => {
  let lookupRequest = {};
  lookupRequest.indexCode = "";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_INDEX_COMPONENTS +
        "?lookupRequest.indexCode=" +
        lookupRequest.indexCode +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/IndexList", (req, res) => {
  let lookupRequest = {};
  lookupRequest.exchange = "HOSE";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_INDEX_LIST +
        "?lookupRequest.exchange=" +
        lookupRequest.exchange +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/DailyOhlc", (req, res) => {
  let lookupRequest = {};
  lookupRequest.symbol = "VN30F2112";
  lookupRequest.fromDate = "06/12/2021";
  lookupRequest.toDate = "16/12/2021";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  lookupRequest.ascending = true;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_DAILY_OHLC +
        "?lookupRequest.symbol=" +
        lookupRequest.symbol +
        "&lookupRequest.fromDate=" +
        lookupRequest.fromDate +
        "&lookupRequest.toDate=" +
        lookupRequest.toDate +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize +
        "&lookupRequest.ascending=" +
        lookupRequest.ascending
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/IntradayOhlc", (req, res) => {
  let lookupRequest = {};
  lookupRequest.symbol = "VN30F1M";
  lookupRequest.fromDate = "15/11/2021";
  lookupRequest.toDate = "15/12/2021";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  lookupRequest.ascending = false;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_INTRADAY_OHLC +
        "?lookupRequest.symbol=" +
        lookupRequest.symbol +
        "&lookupRequest.fromDate=" +
        lookupRequest.fromDate +
        "&lookupRequest.toDate=" +
        lookupRequest.toDate +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize +
        "&lookupRequest.ascending=" +
        lookupRequest.ascending
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/DailyIndex", (req, res) => {
  let lookupRequest = {};
  lookupRequest.indexId = "HNX30";
  lookupRequest.fromDate = "27/01/2021";
  lookupRequest.toDate = "27/01/2021";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  lookupRequest.ascending = true;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_DAILY_INDEX +
        "?lookupRequest.indexId=" +
        lookupRequest.indexId +
        "&lookupRequest.fromDate=" +
        lookupRequest.fromDate +
        "&lookupRequest.toDate=" +
        lookupRequest.toDate +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize +
        "&lookupRequest.ascending=" +
        lookupRequest.ascending
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get("/getstock", (req, res) => {
  res.send(JSON.parse(JSON.stringify(redis.read("stock_HOSE_VCB"))));
});

app.get("/DailyStockPrice", (req, res) => {
  let lookupRequest = {};
  lookupRequest.symbol = "VN30F1M";
  lookupRequest.market = "";
  lookupRequest.fromDate = "01/12/2021";
  lookupRequest.toDate = "04/12/2021";
  lookupRequest.pageIndex = 1;
  lookupRequest.pageSize = 1000;
  Object.assign(lookupRequest, req.query);
  axios
    .get(
      config.market.ApiUrl +
        client.api.GET_DAILY_STOCKPRICE +
        "?lookupRequest.symbol=" +
        lookupRequest.symbol +
        "&lookupRequest.fromDate=" +
        lookupRequest.fromDate +
        "&lookupRequest.toDate=" +
        lookupRequest.toDate +
        "&lookupRequest.pageIndex=" +
        lookupRequest.pageIndex +
        "&lookupRequest.pageSize=" +
        lookupRequest.pageSize +
        "&lookupRequest.market=" +
        lookupRequest.market
    )
    .then((response) => {
      res.send(JSON.parse(JSON.stringify(response.data)));
    })
    .catch((error) => {
      console.log(error);
    });
});

const rq = axios.create({
  baseURL: config.market.ApiUrl,
  timeout: 5000,
});

const messages = [];

rq({
  url: config.market.ApiUrl + client.api.GET_ACCESS_TOKEN,
  method: "post",
  data: {
    consumerID: config.market.ConsumerId,
    consumerSecret: config.market.ConsumerSecret,
  },
}).then(
  (response) => {
    if (response.data.status === 200) {
      let token = "Bearer " + response.data.data.accessToken;
      axios.interceptors.request.use(function (axios_config) {
        axios_config.headers.Authorization = token;
        return axios_config;
      });

      client.initStream({
        url: config.market.HubUrl,
        token: token,
      });
      client.bind(client.events.onData, function (message) {
        // console.log(message);
        saveToRedis(message);
      });
      client.bind(client.events.onConnected, function () {
        client.switchChannel("X:ALL");
      });
      client.start();
    } else {
      console.log(response.data.message);
    }
  },
  (reason) => {
    console.log(reason);
  }
);

function getFormattedDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

const saveToRedis = async (input) => {
  // Get data
  const stockData = JSON.parse(input);
  if (stockData == null) {
    console.log("Stock data content null or not existed");
    return;
  }
  const content = JSON.parse(stockData.Content);

  const newStockObject = baseStockObject;

  //console.log("content data", content);

  newStockObject.exchange = content.Exchange;
  newStockObject.stock_name = content.Symbol;
  newStockObject.update_time = getFormattedDateTime();
  newStockObject.prev_day_c = content.PriorVal;
  newStockObject.pre_v = 0;
  newStockObject.day_o = content.Open;
  newStockObject.day_h = content.High;
  newStockObject.day_l = content.Low;
  newStockObject.day_c = content.Close;
  newStockObject.day_v = content.LastVol;
  newStockObject.price = content.LastPrice;
  newStockObject.bids = [];
  newStockObject.bids.push(content.BidPrice1);
  newStockObject.bids.push(content.BidPrice2);
  newStockObject.bids.push(content.BidPrice3);
  newStockObject.bids = JSON.stringify(newStockObject.bids);
  newStockObject.asks = [
    Number(content.AskPrice1),
    Number(content.AskPrice2),
    Number(content.AskPrice3),
  ];
  newStockObject.asks = JSON.stringify(newStockObject.asks);
  newStockObject.bid_sizes = [
    content.BidVol1,
    content.BidVol2,
    content.BidVol3,
  ];
  newStockObject.bid_sizes = JSON.stringify(newStockObject.bid_sizes);
  newStockObject.ask_sizes = [
    content.AskVol1,
    content.AskVol2,
    content.AskVol3,
  ];
  newStockObject.ask_sizes = JSON.stringify(newStockObject.ask_sizes);
  newStockObject.ceiling = content.Ceiling;
  newStockObject.floor = content.Floor;

  //Save to redis

  // // price of SSI would be full price like 13400, but php need 13.4.
  // newStockObject.c = content.Ceiling / 1000;
  // // newStockObject.c = 98123;
  // newStockObject.f = content.Floor / 1000;
  // newStockObject.tc = content.RefPrice / 1000;
  // newStockObject.lastPrice = content.LastPrice / 1000;
  // newStockObject.lastVolume = content.LastVol;
  // newStockObject.lot = content.TotalVol;
  // newStockObject.ot = Math.abs(parseFloat(content.Change.toFixed(5))) / 1000; // cho nay nghi nghi nhun so hoc dung. can test
  // newStockObject.changePc = Math.abs(content.RatioChange);
  // newStockObject.avePrice = Math.round(content.AvgPrice * 100) / 100 / 1000;
  // //newStockObject.avePrice = content.AvgPrice;
  // newStockObject.highPrice = content.High / 1000;
  // newStockObject.lowPrice = content.Low / 1000;

  if (isNaN(content.AvgPrice) || content.AvgPrice == null) {
    newStockObject.avePrice = 0;
    //console.log("content data", content);
    // console.log("newStockObject", newStockObject.avePrice);
  }

  if (content.Symbol == "VCB") {
    console.log("content data", content);
    console.log("newStockObject", newStockObject);
    const key = "stock_" + content.MarketId + "_" + content.Symbol;
  }

  redis.writeHash(content.Symbol, newStockObject);
  // console.log("newStockObject", newStockObject);
  broadcast(newStockObject);
  messages.push(newStockObject);
};

const server = app.listen(port, "localhost", () =>
  console.log(`Example app listening on port ${port}!`)
);

// WebSocket Server
const wss = new WebSocketServer({ server });
// Store connected clients

const clients = new Set();
// Handle WebSocket Connections
wss.on("connection", (ws) => {
  console.log("WebSocket client connected.");

  // Add the client to the set
  clients.add(ws);

  messages.forEach((x) => {
    ws.send(JSON.stringify(x));
  });

  // Remove client on close
  ws.on("close", () => {
    console.log("WebSocket client disconnected.");
    clients.delete(ws);
  });

  // Handle WebSocket errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  // Handle incoming messages (optional)
  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  // Example: Send a welcome message
  ws.send(JSON.stringify({ message: "Welcome to WebSocket server!" }));
});

// Function to send messages to all connected clients
const broadcast = (message) => {
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  }
};
// Example: Send a message every 10 seconds
// setInterval(() => {
//   broadcast({ type: 'ping', timestamp: new Date().toISOString() });
// }, 1000);

// Graceful shutdown logic
const handleExit = async (signal) => {
  console.log(`Received signal to terminate: ${signal}`);

  // Close Redis connection
  try {
    await redis.quit();
    console.log("Redis connection closed");
  } catch (err) {
    console.error("Error closing Redis connection:", err);
  }

  // // Stop the WebSocket server
  // wss.close(() => {
  //   console.log("WebSocket server closed");
  // });

  // Stop the Express server
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0); // Exit with success
  });
};

// Handle process signals
process.on("SIGINT", handleExit); // Ctrl+C
process.on("SIGTERM", handleExit); // Termination signal (e.g., from Docker)
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  handleExit("uncaughtException");
});
