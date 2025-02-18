module.exports = {
  market: {
    HubUrl: process.env.MARKET_HUBURL || "wss://fc-datahub.ssi.com.vn/",
    ApiUrl: process.env.MARKET_APIURL || "https://fc-data.ssi.com.vn/",
    ConsumerId: process.env.MARKET_CONSUMERID ||  "dc24486aa9d94dbda3bbf6229905b3d0",
    ConsumerSecret: process.env.MARKET_CONSUMERSECRET || "4ca2b53b0d0e483cbcfeca4abadd8251",
  },
  redis: {
    host: process.env.REDISHOST || "103.37.61.162",
    post: process.env.REDISPORT || 6379,
    password: process.env.REDISPASSWORD  || "",
    db: process.env.REDISPORT || 5,
  },
  enviroment:{
    process: "dotnet",
  }
};
