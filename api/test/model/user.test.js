const User= require("../../models/users")
const Habits=require("../../models/habits")
const db=require("../../dbConfig/init")

const pg = require("pg");
jest.mock("pg");


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
/*
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
      expect(habits).toBe(2);
      //expect(habits[0]).toHaveProperty("path", "/habits/1");
    });
  });
  */

 /* describe("complete (mark as)", () => {
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
  });*/

  describe("findById", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 1,
        name: "Test User",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData.id] });
      const result = await User.findUserById(1);
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("getonebyusername", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 2,
        name: "jo",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData.name] });
      const result = await User.getOneByUsername("jo");
      expect(result).toBeInstanceOf(User);
    });
  });

  //findhabits
  describe("findhabits function test", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 2,
        name: "jo",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.findHabits(userData);
      expect(result).toBeInstanceOf(User);
    });
  });

  //register
  describe("register function test", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 2,
        name: "jo",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.register(userData.name,emauserData.email,userData.password);
      expect(result).toBeInstanceOf(User);
    });
  });


  describe("habit getstreakbyid", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id: 1,
        name: "Test User",
        email: "testEmail@email.com",
        password: "Test_Password"
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await Habits.habitStreaksById(1);
      expect(result).toBeInstanceOf(User);
    });
  });

  //habits
  describe("habits- alluserbyid", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        id : 1,
        habit : "sleep",
        frequency : 3,
        streak:0,
        lastComplete: 12,
        completeToday :true,
        lastCompleteDay :15,
        user_id: 1
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData.id] });
      const result = await Habits.allByUserId(1);
      expect(result).toBeInstanceOf(Habits);
    });
  });
  
  /*

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
  });*/

});
