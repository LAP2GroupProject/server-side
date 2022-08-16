const app = require("../../server.js");

describe("user endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(3000, () =>
      console.log("Test server running on port 3000")
    );
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  describe("Returning Users", () => {
    it("should return a list of all users in database", async () => {
      const res = await request(api).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });

    it("should return a list of habits by the first user", async () => {
      const res = await request(api).get("/user/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body.books.length).toEqual(1);
    });
  });

  describe("Creating Users", () => {
    it("should create a new user", async () => {
      const res = await request(api).post("/users").send({
        id: 3,
        name: "Test Name",
        email: "testname@testing.com",
        password: "testing"
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");

      const userRes = await request(api).get("/users");
      expect(userRes.body.books.length).toEqual(3);
    });
  });

  describe("Creating Habits", () => {
    it("should create a new habit by a new user", async () => {
      const res = await request(api).post("/users").send({
        id: 4,
        habitName: "New Habit by New user",
        userId: 8,
        frequency: 3,
        streak: 1
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
      // console.log(res);
      const authRes = await request(api).get("/user/4");
      // console.log(authRes);
      expect(authRes.statusCode).toEqual(200);
      expect(authRes.body.books.length).toEqual(4);
    });

    it("should create a new habit by an existing user", async () => {
      const res = await request(api).post("/users").send({
        id: 5,
        habitName: "New Habit by Existing user",
        userId: 8,
        frequency: 3,
        streak: 1
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");

      const userRes = await request(api).get("/users/5");
      expect(userRes.body.books.length).toEqual(5);
    });
  });
});
