const habitController = require("../../controllers/habits");
const Habit = require("../../models/habits");
const db=require("../../dbConfig/init")

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe("Habit Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns habits with a 200 status code", async () => {
      jest.spyOn(Habit, "all", "get").mockResolvedValue(["habit1", "habit2"]);
      await habitController.habitIndex(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["habit1", "habit2"]);
    });
  });

  //habit index
  describe("controller-habitindex", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await habitController.habitIndex;
      expect(all).toHaveLength(2);
    });
  });
  describe('show', () => {
    test('it returns an error habit with a 422 status code', async () => {
        let testHabit = {
            id: 1, 
            habit: 'Test Book', 
            frequency: 2,
            streak: 5, 
            lastComplete: 4, 
            completeToday: "false",
            user_id: 1,
        }
        jest.spyOn(Habit, 'allByUserId')
            .mockResolvedValue(new Habit(testHabit));
            
        const mockReq = { params: { id: 1 } }
        await habitController.create(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(422);
    })
});

  describe('create', () => {
    test('it returns a new habit with a 201 status code', async () => {
        let testHabit = {
          id: 1, 
          habit: 'Test Book', 
          frequency: 2,
          streak: 5, 
          lastComplete: 4, 
          completeToday: false,
          user_id: 1,
      }
        jest.spyOn(Habit, 'create')
            .mockResolvedValue(new Habit(testHabit));
            
        const mockReq = { body: testHabit }
        await habitController.create(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
    })
  });


  describe("create function test", () => {
    test("it resolves with a new habit on successful db query", async () => {
      let habitData = {
        id: 1,
        habit: 'Test habs', 
        frequency: 2,
        streak: 5, 
        lastComplete: 4, 
        completeToday: false,
        user_id: 1,
      };
     
   
      const result = await Habit.create(habitData);
      expect(result).toHaveProperty("id");
    });
  });




//get habits

  describe('gethabit function', () => {
    test('it returns a new habit with a 200 status code', async () => {
        let testHabit = {
          id: 1, 
          habit: 'Test Book', 
          frequency: 2,
          streak: 5, 
          lastComplete: 4, 
          completeToday: false,
          user_id: 1,
      }
        jest.spyOn(Habit, 'create')
            .mockResolvedValue(new Habit(testHabit));
            
        const mockReq = { body: testHabit }
        await habitController.getHabits(mockReq, mockRes);
        expect(mockStatus).toBe(200);
        expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
    })
  });




//gethabitbyid habit 

describe('gethabitsbyid function', () => {
    test('it returns a new habit with a 200 status code', async () => {
        let testHabit = {
          id: 1, 
          habit: 'Test Book', 
          frequency: 2,
          streak: 5, 
          lastComplete: 4, 
          completeToday: false,
          user_id: 1,
      }
        jest.spyOn(Habit, 'completeHabit')
            .mockResolvedValue(new Habit(testHabit));
            
        const mockReq = testHabit.id;
        await habitController.getHabitsById(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));

    })
  });

  describe("completehabit", () => {
    test("it returns habits with a 200 status code", async () => {
      jest.spyOn(Habit, "all", "get").mockResolvedValue(["habit1", "habit2"]);
      await habitController.completeHabit(null, mockRes);
     expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["habit1", "habit2"]);
    });
  });












});