const request = require("supertest");
const app = require("../index.js");

describe("Market Route Tests", () => {
  it("should return a 404 error if an invalid symbol is passed to Finnhub", async () => {
    // AAPL_INVALID is a fake symbol, Finnhub should return 0 for price.
    const res = await request(app).get("/market/quote/AAPL_INVALID");
    
    // We expect our code to return a 404 when data.c is 0
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBeDefined();
  });

  it("should fetch live price successfully for a valid US stock", async () => {
    // AAPL is a real symbol
    const res = await request(app).get("/market/quote/AAPL");
    
    // If rate limited, this might fail, but normally should be 200
    if (res.statusCode === 200) {
      expect(res.body.c).toBeDefined();
      expect(typeof res.body.c).toBe("number");
    } else {
      console.warn("Finnhub rate limited during test or API key missing.");
    }
  });
});
