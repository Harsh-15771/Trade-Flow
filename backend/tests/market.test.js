const request = require("supertest");
const app = require("../index.js");
const axios = require("axios");

// Mock axios so we don't hit the real Finnhub API during unit tests
jest.mock("axios");

describe("Market Route Tests", () => {
  it("should return a 404 error if an invalid symbol is passed to Finnhub", async () => {
    // Mock axios to return 0 for an invalid symbol
    axios.get.mockResolvedValue({ data: { c: 0 } });

    const res = await request(app).get("/market/quote/AAPL_INVALID");
    
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBeDefined();
  });

  it("should fetch live price successfully for a valid US stock", async () => {
    // Mock axios to return a valid price
    axios.get.mockResolvedValue({ data: { c: 150.5 } });

    const res = await request(app).get("/market/quote/AAPL");
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.c).toBeDefined();
    expect(res.body.c).toEqual(150.5);
  });
});
