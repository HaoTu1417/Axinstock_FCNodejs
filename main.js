/** @START_CONFIG */

const express = require("express");
const config = require("./config.js");
const cors = require("cors"); // Import cors
const redis = require("./redis.js");
const client = require("ssi-fcdata");
const axios = require("axios");
const { WebSocketServer } = require("ws");
const app = express();
const port = config.enviroment.port || 3020;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'stockObject.json'); // File to save stockObject
// Enable CORS for all routes
app.use(cors());

// console.log(config.enviroment.port);
/** @END_CONFIG */

const baseStockObjectPHP = {
  id: 2100,
  sym: "VCB",
  mc: "10",
  c: 98.1,
  f: 85.3,
  r: 91.7,
  lastPrice: 91,
  lastVolume: 22510,
  lot: 187490,
  ot: "0.70",
  changePc: "0.76",
  avePrice: "91.41",
  highPrice: "92.30",
  lowPrice: "90.90",
  fBVol: "53250",
  fBValue: "0",
  fSVolume: "100931",
  fSValue: "0",
  fRoom: "375989265",
  g1: "90.90|3470|d",
  g2: "90.80|2650|d",
  g3: "90.70|2070|d",
  g4: "91.00|8050|d",
  g5: "91.50|220|d",
  g6: "91.70|450|e",
  g7: "0|0|e",
  mp: "0%",
  CWUnderlying: "        ",
  CWIssuerName: "                         ",
  CWType: " ",
  CWMaturityDate: "        ",
  CWLastTradingDate: "        ",
  CWExcersisePrice: "0.000",
  CWExerciseRatio: "           ",
  CWListedShare: "1294123966.00",
  sType: "S",
  sBenefit: "0",
};

const baseStockObject = {
  name: "",
  exchange: "HOSE",
  updateTime: "2024-12-13T09:15:01",
  isEnabled: 1,
  high: 0,
  low: 0,
  price: 0,
  ceiling: 0,
  floor: 0,
  reference:0,
  orderBook: {
    asks: [],
    askSizes: [],
    bids: [],
    bidSizes: [],
  },
  match:{
     price: 0,
    volume: 0,
    change: 0,
    percentChange: "0%",
    percent: 0
  }
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

// const stockObject = {
//   "ACB": {
//     "symbol": "ACB",
//     "open": 27.0,
//     "close": 25.5,
//     "last": 26.75,
//     "match": {
//       "price": 25,
//       "volume": 231300,
//       "change": 0.0,
//       "percentChange": 0.0
//     },
//     "orderBook": {
//       "bidPrice1": 24.85,
//       "bidVolume1": 233300,
//       "bidPrice2": 24.9,
//       "bidVolume2": 478000,
//       "bidPrice3": 24.95,
//       "bidVolume3": 220800,
//       "askPrice1": 25.0,
//       "askVolume1": 338100,
//       "askPrice2": 25.05,
//       "askVolume2": 219100,
//       "askPrice3": 25.1,
//       "askVolume3": 158200
//     },
//     "totalVolume": 408100,
//     "low": 25.0,
//     "high": 24.8,
//     "foreign": {
//       "buyVolume": 434000,
//       "sellVolume": 434000,
//       "totalValue": 239548456
//     }
//   },
//   "BID": {
//     "symbol": "BID",
//     "open": 43.2,
//     "close": 42.0,
//     "last": 42.5,
//     "match": {
//       "price": 25,
//       "volume": 231300,
//       "change": 0.0,
//       "percentChange": 0.0
//     },
//     "orderBook": {
//       "bidPrice1": 24.85,
//       "bidVolume1": 233300,
//       "bidPrice2": 24.9,
//       "bidVolume2": 478000,
//       "bidPrice3": 24.95,
//       "bidVolume3": 220800,
//       "askPrice1": 25.0,
//       "askVolume1": 338100,
//       "askPrice2": 25.05,
//       "askVolume2": 219100,
//       "askPrice3": 25.1,
//       "askVolume3": 158200
//     },
//     "totalVolume": 408100,
//     "low": 25.0,
//     "high": 24.8
//   },
//   "FPT": {
//     "symbol": "FPT",
//     "open": 160.0,
//     "close": 159.0,
//     "last": 159.5,
//     "match": {
//       "price": 25,
//       "volume": 231300,
//       "change": 0.0,
//       "percentChange": 0.0
//     },
//     "orderBook": {
//       "bidPrice1": 24.85,
//       "bidVolume1": 233300,
//       "bidPrice2": 24.9,
//       "bidVolume2": 478000,
//       "bidPrice3": 24.95,
//       "bidVolume3": 220800,
//       "askPrice1": 25.0,
//       "askVolume1": 338100,
//       "askPrice2": 25.05,
//       "askVolume2": 219100,
//       "askPrice3": 25.1,
//       "askVolume3": 158200
//     },
//     "totalVolume": 408100,
//     "low": 25.0,
//     "high": 24.8
//   }
// }

const stockObject = {};
function transformData(data) {
  //console.log('data',data);
  const result = {
    name: data.Symbol,
    open: data.Open,
    ceiling: data.Ceiling,
    floor:data.Floor,
    reference: data.RefPrice,
    close: data.Close,
    last: data.LastPrice,
    match: {
      price: data.LastPrice,
      volume: data.LastVol,
      change: data.Change,
      percentChange: data.RatioChange,
    },
    orderBook: {
      asks: [data.AskPrice1, data.AskPrice2, data.AskPrice3],
      askSizes: [data.AskVol1, data.AskVol2, data.AskVol3],
      bids: [data.BidPrice1, data.BidPrice2, data.BidPrice3],
      bidSizes: [data.BidVol1, data.BidVol2, data.BidVol3],
      bidPrice1: data.BidPrice1,
      bidVolume1: data.BidVol1,
      bidPrice2: data.BidPrice2,
      bidVolume2: data.BidVol2,
      bidPrice3: data.BidPrice3,
      bidVolume3: data.BidVol3,
      askPrice1: data.AskPrice1,
      askVolume1: data.AskVol1,
      askPrice2: data.AskPrice2,
      askVolume2: data.AskVol2,
      askPrice3: data.AskPrice3,
      askVolume3: data.AskVol3,
    },
    totalVolume: data.TotalVol,
    low: data.Low,
    high: data.High,
    foreign: {
      buyVolume: 0, // No data provided for foreign buy volume
      sellVolume: 0, // No data provided for foreign sell volume
      totalValue: 0, // No data provided for foreign total value
    },
  };
  return result;
}


app.get("/stocks", (req, res) => {

  const stockValues = [];
  for (const key in stockObject) {
    if (stockObject.hasOwnProperty(key)) {
      stockValues.push(stockObject[key]);
    }
  }
  // return stocks;
  //console.log("stockValues",stockValues)
  res.send(stockValues);

  
  //res.send(JSON.parse(JSON.stringify(redis.read("stock_HOSE_VCB"))));
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
       
       
  
       const dataObject = JSON.parse(message);
       if(dataObject!=null){
        const content = JSON.parse(dataObject.Content);
        if(content !=null){
          const stock = transformData(content);
         
          stockObject[stock.name] = stock;
          // console.log('stockObject',stockObject);
        }
      
       }
       
        if (config.enviroment.process == "php") {
          saveToRedisPhp(message);
        } else {

          saveToRedis(message);
        }
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

  newStockObject.exchange = content.Exchange;
  newStockObject.name = content.Symbol;
  newStockObject.updateTime = getFormattedDateTime();
  //console.log('stock_name',newStockObject.stock_name,' ',newStockObject.update_time);
  newStockObject.reference = content.PriorVal;
  newStockObject.pre_v = 0;
  newStockObject.day_o = content.Open;
  newStockObject.high = content.High;
  newStockObject.low = content.Low;
  newStockObject.day_c = content.Close;
  // newStockObject.match.volume = content.LastVol;
  // newStockObject.match.price = content.LastPrice;
  // newStockObject.orderBook.bids = [];
  // newStockObject.orderBook.bids.push(content.BidPrice1);
  // newStockObject.orderBook.bids.push(content.BidPrice2);
  // newStockObject.orderBook.bids.push(content.BidPrice3);
  // newStockObject.orderBook.bids = JSON.stringify(newStockObject.bids);
//   newStockObject.orderBook.asks = [
//     Number(content.AskPrice1),
//     Number(content.AskPrice2),
//     Number(content.AskPrice3),
//   ];
//  newStockObject.orderBook.asks = JSON.stringify(newStockObject.orderBook.asks);
//   newStockObject.orderBook.bidSizes = [
//     content.BidVol1,
//     content.BidVol2,
//     content.BidVol3,
//   ];
//   newStockObject.orderBook.bid_sizes = JSON.stringify(
//     newStockObject.orderBook.bid_sizes
//   );
//   newStockObject.orderBook.askSizes = [
//     content.AskVol1,
//     content.AskVol2,
//     content.AskVol3,
//   ];
//   newStockObject.orderBook.ask_sizes = JSON.stringify(
//     newStockObject.orderBook.ask_sizes
//   );
//   newStockObject.ceiling = content.Ceiling;
//   newStockObject.floor = content.Floor;

  if (isNaN(content.AvgPrice) || content.AvgPrice == null) {
    newStockObject.avePrice = 0;
  }

  if (content.Symbol == "VCB") {
    //console.log("content data", content);
    console.log("newStockObject", JSON.stringify(newStockObject));
    const key = "stock_" + content.MarketId + "_" + content.Symbol;
  }

  redis.writeHash(content.Symbol, newStockObject);
  //console.log("newStockObject", newStockObject);
  //  console.log(
  //    "newStockObject",
  //    newStockObject,
  //    JSON.stringify(newStockObject),
  //    JSON.parse(JSON.stringify(newStockObject))
  //  );
  broadcast(JSON.stringify(newStockObject));
  messages.push(JSON.stringify(newStockObject));
};

const saveToRedisPhp = async (input) => {
  // Get data
  // console.log("saveToRedisPhp")
  const stockData = JSON.parse(input);
  if (stockData == null) {
    console.log("Stock data content null or not existed");
    return;
  }
  const content = JSON.parse(stockData.Content);


  const newStockObject = baseStockObjectPHP

  //console.log("content data", content);
  //Save to redis
  newStockObject.sym = content.Symbol;
  // price of SSI would be full price like 13400, but php need 13.4.
  newStockObject.c = content.Ceiling / 1000;
  // newStockObject.c = 98123;
  newStockObject.f = content.Floor / 1000;
  newStockObject.tc = content.RefPrice / 1000;
  newStockObject.lastPrice = content.LastPrice / 1000;
  newStockObject.lastVolume = content.LastVol;
  newStockObject.lot = content.TotalVol;
  newStockObject.ot = Math.abs(parseFloat(content.Change.toFixed(5))) / 1000;// cho nay nghi nghi nhun so hoc dung. can test
  newStockObject.changePc = Math.abs(content.RatioChange);
  newStockObject.avePrice = (Math.round(content.AvgPrice * 100) / 100) / 1000;
  //newStockObject.avePrice = content.AvgPrice;
  newStockObject.highPrice = content.High / 1000;
  newStockObject.lowPrice = content.Low / 1000;
  if (isNaN(content.AvgPrice) || content.AvgPrice == null) {
    newStockObject.avePrice = 0;
    //console.log("content data", content);
    // console.log("newStockObject", newStockObject.avePrice);
  }
  if (newStockObject.avePrice == null || content.Symbol == "VCB") {
    //  console.log("content data", content);
    //  console.log("newStockObject", newStockObject.avePrice);
  }
  const key = "stock_" + content.MarketId + "_" + content.Symbol;
  redis.write(key, newStockObject);
  // console.log("newStockObject", newStockObject);
   broadcast(newStockObject);
   messages.push(newStockObject);
};

const server = app.listen(port, "0.0.0.0", () =>
  console.log(`Example app listening on port ${port}!`)
);





// Example: Simulate a stock update message for broadcasting
const updatedStock = {
  name: "ACBa",         // Name of the stock to update
  ceiling: 28.0,       // Updated ceiling price
  roof: 26.0,          // Updated roof price
  reference: 27.5,     // Updated reference price
  orderBook: {
    ask3Price: 26.8,
    ask3Vol: 1000,
    ask2Price: 26.7,
    ask2Vol: 1200,
    ask1Price: 26.6,
    ask1Vol: 1500,
    bid1Price: 26.5,
    bid1Vol: 1800,
    bid2Price: 26.4,
    bid2Vol: 2000,
    bid3Price: 26.3,
    bid3Vol: 2200,
  },
  match: {
    price: 26.75,
    vol: 1000,
    change: 0.0,
    changeInPercent: 0.0,
  },
  forgein: {
    buy: 500,
    sell: 400,
    room: 3000,
  },
  vol: 3000,
  high: 28.0,
  low: 25.5,
};



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
  // Handle incoming messages
  ws.on("message", (message) => {
    // Convert the Buffer to a string
    const messageStr = message.toString();
    console.log("Received message:", messageStr);

    try {
      const parsedMessage = JSON.parse(messageStr);
      console.log("Parsed message:", parsedMessage);

      // Example: Simulate a stock update message for broadcasting
      const updatedStock = {
        name: "ACB",         // Name of the stock to update
        ceiling: 28.0,       // Updated ceiling price
        roof: 26.0,          // Updated roof price
        reference: 27.5,     // Updated reference price
        orderBook: {
          ask3Price: 26.8,
          ask3Vol: 1000,
          ask2Price: 26.7,
          ask2Vol: 1200,
          ask1Price: 26.6,
          ask1Vol: 1500,
          bid1Price: 26.5,
          bid1Vol: 1800,
          bid2Price: 26.4,
          bid2Vol: 2000,
          bid3Price: 26.3,
          bid3Vol: 2200,
        },
        match: {
          price: 26.75,
          vol: 1000,
          change: 0.0,
          changeInPercent: 0.0,
        },
        forgein: {
          buy: 500,
          sell: 400,
          room: 3000,
        },
        vol: 3000,
        high: 28.0,
        low: 25.5,
      };
      
      // Broadcast the updated stock to all connected clients
    //  broadcast(JSON.stringify(updatedStock));

      console.log("after send");
    } catch (error) {
      console.error("Failed to parse message:", error);
    }
  });

  // Example: Send a welcome message
  ws.send(JSON.stringify(updatedStock));
});

// Function to send messages to all connected clients
const broadcast = (message) => {
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      try {
        client.send(message);
      } catch (err) {
        console.log("broadcast err: ", err);
      }
    }
  }
};

// Function to write stockObject to file
function saveStockObjectToFile() {
  fs.writeFile(filePath, JSON.stringify(stockObject, null, 2), (err) => {
    if (err) {
      console.error("Error writing stockObject to file:", err);
    } else {
      console.log("Stock object saved to file.");
    }
  });
}

// Graceful shutdown logic
const handleExit = async (signal) => {
  console.log(`Received signal to terminate: ${signal}`);

  try {
    if (redis.status === 'ready') {
      console.log("Closing Redis connection...");
      await redis.quit();
      console.log("Redis connection closed");
    } else {
      console.log("Redis was not in a ready state.");
    }
  } catch (err) {
    console.error("Error while closing Redis connection:", err);
  }

  // Save stockObject to file before exit
  // saveStockObjectToFile();

  // Stop the WebSocket server (if needed)
  wss.close(() => {
    console.log("WebSocket server closed");
  });

  // Stop the Express server
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0); // Exit with success
  });
};

// Handle termination signals
process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);



