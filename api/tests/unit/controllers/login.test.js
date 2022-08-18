const usersController = require("../../../controllers/users")
const User = require("../../../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const login = require("../../../controllers/login")
const createToken = login.createToken

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

    describe("login", () => {
        test("it returns 401 if unauthorised", async () => {
            jest.spyOn(User, "getOneByUsername").mockResolvedValue({error: "Error. Unable to authenticate user.", success: "false"})
            await login.login(null, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(401);
            expect(mockJson).toHaveBeenCalledWith({error: "Error. Unable to authenticate user.", success: "false"});
        })


    })

})