const User = require("../../../models/users");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("users", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await User.all;
      expect(all).toHaveLength(3);
    });
  });

  describe("habits", () => {
    test("it resolves with formatted habits on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            habitName: "habit1",
            userId: 3,
            frequency: 8,
            streak: 4
          },
          { id: 2, habitName: "habit2", userId: 1, frequency: 6, streak: 8 }
        ]
      });
      let testUser = new User({
        id: 1,
        name: "Test User",
        email: "testEmail@email.com",
        password: "Test_Password"
      });
      const habits = await testUser.habits;
      expect(habits).toHaveLength(2);
      expect(habits[0]).toHaveProperty("path", "/habits/1");
    });
  });

  describe("complete (mark as)", () => {
    test("it resolves with message on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ id: 1 });
      let testUser = new User({
        id: 1,
        name: "Test User",
        email: "testEmail@email.com",
        password: "Test_Password"
      });
      const result = await testUser.complete();
      expect(result).toBe("User 1 has marked a habit as completed");
    });
  });

  describe("findById", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 1,
        name: "Test User",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.findById(1);
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("create", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 1,
        name: "Test User",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.create("New User");
      expect(result).toBeInstanceOf(User);
    });
  });
});
