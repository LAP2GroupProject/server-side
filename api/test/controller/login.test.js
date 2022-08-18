
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const login = require("../../controllers/login")
const extractID = require("../../models/extract")

const createToken = login.createToken
const User = require("../../models/users")

const extracts=require("../../models/extract")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe("Login Controller", () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe("createToken", () => {
        test("it returns a token with length 137 when given a json object containing an id", async () => {
            const userData = {'id': 1}
            const data = await createToken(userData)
            expect(data).toHaveLength(137)
        })
    })

    describe("extract function", () => {
        test("it returns an id with length 1 when given a token", async () => {
            const userData = {'id': 1}
            const data = await createToken(userData);
            const res = await extractID(data);
            expect(res).toHaveLength(1);
        })
    })

    describe("login", () => {
        test("it returns 401 if unauthorised", async () => {
            jest.spyOn(User, "getOneByUsername").mockResolvedValue({error: "Error. Unable to authenticate user.", success: "false"})
            await login.login(null, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(401);
            expect(mockJson).toHaveBeenCalledWith({error: "Error. Unable to authenticate user.", success: "false"});
        })



    })

   /* describe("register", () => {
        test("it returns 404 if unauthorised", async () => {
            jest.spyOn(User, "getOneByUsername").mockResolvedValue({error: "err", success: "false"})
            await login.register(null, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({error: "err", success: "false"});
        })


    })*/
    describe("register", () => {
        test("it returns", async () => {
            jest.spyOn(User, "register").mockResolvedValue({user: "username"})
            await login.register(null, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({user: "username"})
        })
    })
})

