const usersController = require("../../../controllers/users");
const User = require("../../../models/users");

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
      jest.spyOn(User, "findById").mockResolvedValue(
        new User({
          id: 1,
          name: "Test User",
          email: "testemail@test.com",
          password: "test_password"
        })
      );
      jest
        .spyOn(User.prototype, "habits", "get")
        .mockResolvedValue(["habit1", "habit2"]);

      const mockReq = { params: { id: 1 } };
      await usersController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        id: 1,
        habits: ["habit1", "habit2"],
        name: "Test User",
        email: "Test Email",
        password: "Test Password"
      });
    });
  });
});
