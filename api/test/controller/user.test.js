const usersController=require("../../controllers/users")
const User= require("../../models/users")
const ControllerHabits=require("../../controllers/habits")
const db=require("../../dbConfig/init")


const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe("Users Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

 

  describe("controller-user-index", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await usersController.index;
      expect(all).toHaveLength(2);
    });
  });

  describe("index", () => {
    test("it returns habits with a 200 status code", async () => {
      jest.spyOn(User, "all", "get").mockResolvedValue(["user1", "user2"]);
      await usersController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["user1", "user2"]);
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
      jest.spyOn(usersController, "findByUserId").mockResolvedValue(
        new usersController({
          id: 1,
          name: "Test User",
          email: "testemail@test.com",
          password: "test_password"
        })
      );
      jest
        .spyOn(usersController.prototype, "habits", "get")
        .mockResolvedValue(["habit1", "habit2"]);

      const mockReq = { params: { id: 1 } };
      await usersController.show(usersController.findUserById(mockReq), mockRes);
      await usersController.show;

      
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

  
  describe('show function', () => {
    test('it returns an error habit with a 404 status code', async () => {
        let user = {
          id: 1,
          name: "Test User",
          email: "testemail@test.com",
          password: "test_password"
            
        }
        jest.spyOn(usersController, 'show')
            .mockResolvedValue(new usersController(user));
            
        const mockReq = { params: { id: 1 } }
        await usersController.show(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(404);
    })
});





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