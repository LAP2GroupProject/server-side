
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const login = require("../../controllers/login")
const extractID = require("../../models/extract")
const createToken = login.createToken

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

})