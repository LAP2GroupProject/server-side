const usersController = require("../../../controllers/users");
const User = require("../../../models/users");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe("Users Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns users with a 200 status code", async () => {
      jest.spyOn(User, "all", "get").mockResolvedValue(["user1", "user2"]);
      await usersController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["user1", "user2"]);
    });
  });

  describe("show", () => {
    test("it returns a user and their habits with a 200 status code", async () => {
      jest.spyOn(User, "findUserById").mockResolvedValue(
        new User({
          id: 1,
          name: "TestUser",
          email: "testemail@test.com",
          password: "test_password"
        })
      );
      jest
        .spyOn(User, "findUserById").mockResolvedValue({"habits": ["habit1", "habit2"], "id": 1, "name": "Test User"} );

      const mockReq = { params: { id: 1 } };
      await usersController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        id: 1,
        name: "Test User",
        habits: ["habit1", "habit2"]
      });
    });
  });
});
