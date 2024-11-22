const Redis = require("ioredis");
const config = require("./config.js");

// Connect to Redis
const redis = new Redis({
  host: config.redis.host, // Redis server address
  port: config.redis.post, // Redis port (default: 6379)
  password: config.redis.password, // Set if authentication is required
});

// Connection event handling
redis.on("connect", () => {
    console.log("Connected to Redis"); 
    // console.log(read("stock_HOSE_VCB"));
});
redis.on("error", (err) => console.error("Redis connection error:", err));




const write = async (key, value) => {
  try {
    await redis.set(key, JSON.stringify(value));
   // console.log(`Data written to Redis: ${key} = ${value}`);
  } catch (error) {
    console.error(`Error writing to Redis for key "${key}":`, error);
  }
};


const read = async (key) => {
  try {
    const data = await redis.get(key);
    //console.log(`Data retrieved from Redis for key "${key}":`, data);
    return data;
  } catch (error) {
    console.error(`Error reading from Redis for key "${key}":`, error);
    throw error; // Re-throw error for caller to handle if needed
  }
};
const quit = async ()=>{
  await redis.quit();
  console.log('Redis connection closed');
}

console.log(Date.now());
console.log("Log",read("stock-HOSE-VCB"))
console.log(Date.now());

module.exports = {
    read,
    write,
    quit,
};