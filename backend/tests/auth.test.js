const request = require("supertest");
const app = require("../index.js");

describe("Auth Route Tests", () => {
  const testUser = {
    email: "testuser@example.com",
    name: "testuser",
    password: "Password123!",
  };

  it("should successfully signup a new user and return a token", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send(testUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("User registered successfully");
    // JWT Token should be in the cookie
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/token=/);
  });

  it("should fail to signup with an existing email", async () => {
    // Attempting to signup with the same testUser from the previous test
    const res = await request(app)
      .post("/auth/signup")
      .send(testUser);

    expect(res.statusCode).toEqual(400); // Or whatever status your app returns for duplicate email
    // Passport-local-mongoose returns 500 or 400 for UserExistsError depending on implementation.
    // Assuming our route handles it gracefully or returns an error.
  });

  it("should successfully login an existing user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Login successful");
    
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/token=/);
  });
  
  it("should fail to login with incorrect password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword!",
      });

    expect(res.statusCode).toEqual(400); // Assuming AuthRoute returns 400 for incorrect password
    expect(res.body.error).toEqual("Invalid credentials");
  });
});
