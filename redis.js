const Redis = require("ioredis");
const config = require("./config.js");

const redisConfig = {
  host: config.redis.host || "localhost",
  port: Number(config.redis.REDISPORT || 6379), // ✅ Convert to number
  password: config.redis.REDISPASSWORD || "",
  db: Number(config.redis.DB) || 0, // ✅ Ensure DB is a number
};

// Connect to Redis
const redis = new Redis(redisConfig);
console.log("config", redisConfig);

// Connection event handling
redis.on("connect", () => {
    console.log("Connected to Redis"); 
    // console.log(read("stock_HOSE_VCB"));
});
redis.on("error", (err) => console.error("Redis connection error:", err));




const write = async (key, value) => {
  if(value.sym == "VCB"){
   // console.log(`Data written to Redis: ${key} = ${ JSON.stringify(value)}`);
  }
  try {
    await redis.set(key, JSON.stringify(value));
    return true;
   // 
  } catch (error) {
    console.error(`Error writing to Redis for key "${key}":`, error);
    return false;
  }
};

const writeHash = async (key, hashValue) => {
  try {
    await redis.hset(key, hashValue);
    //console.log(`Hash ${key} set successfully.`,hashValue);
    // if(hashValue.sym == "VCB"|| key == "VCB"){
    //   console.log(`Data written to Redis: ${key} = ${ JSON.stringify(hashValue)}`);
    // }
    return true;
  } catch (error) {
    console.error('Error setting hash:', error);
    return false;
  } 
}

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

const readHash = async (key) => {
  try {
    const data = await redis.hgetall(key);
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



module.exports = {
    read,
    write,
    quit,
    writeHash
};