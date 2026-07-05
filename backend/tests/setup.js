const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

// Provide mock environment variables for unit testing in CI environments
process.env.SECRET_KEY = "test_secret_key_for_ci_pipeline";
process.env.FINNHUB_API_KEY = "test_finnhub_api_key";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Close any existing connections to prevent leaks
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});


