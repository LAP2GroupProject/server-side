const usersController=require("../../controllers/users")
const User= require("../../models/users")
const db=require("../../dbConfig/init")

describe("Users Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await usersController.index
      expect(all).toBe(200);
    });
  });
/*
  describe("index", () => {
    test("it returns users with a 200 status code", async () => {
      jest.spyOn(usersController.index, "all", "get").mockResolvedValue(["user1", "user2"]);
      await usersController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["user1", "user2"]);
    });
  });
*/
     /* describe('Create', () => {
            it('Should Return my Json', done => {
           
             const result = User.create();
            expect(result).expect(200);
           
        expect({  "body": 'earth' }, done);
            });*/

  describe("show", () => {
    test("it returns a user and their habits with a 200 status code", async () => {
      jest.spyOn(User.findUserById, "findById").mockResolvedValue(
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
      await usersController.show(User.findUserById(mockReq), mockRes);
      
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
