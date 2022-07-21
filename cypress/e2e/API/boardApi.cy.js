import login from "../../fixtures/apiMock/login";
import board from "../../fixtures/apiMock/board";

describe("Create board", () => {

    beforeEach('user login', () => {
        login.post({assert : false});
    })

    it("Test 1 - Create board without name", () => {
        board.post({name : "", statusCode : 422, statusText: "Unprocessable Entity"});
    })

    it("Test 2 - Create board without type", () => {
        board.post({type : "", statusCode : 422, statusText: "Unprocessable Entity"});
    })

    it("Test 3 - Create board with invalid board type", () => {
        board.post({type : "some_board", statusCode : 422, statusText: "Unprocessable Entity"});
    })

    it("Test 4 - Create board without logging in", () => {
        board.post({token : "", statusCode : 401, statusText: "Unauthorized"});
    })

    it("Test 5 - Create board with valid data", () => {
        board.post({});
    })

    it("Test 6 - Create board in different organization", () => {
        board.post({organization_id : 20303});
    })

    it("Test 7 - Create board valid data - scrum board", () => {
        board.post({type : "scrum_board"});
    })

    it("Test 8 - Get non-existing board data", () => {
        board.get({boardId : 99999, statusCode : 404, statusText : "Not Found"});
    })

    it("Test 9 - Get other user board data", () => {
        board.get({boardId : 7945, statusCode : 403, statusText : "Forbidden"});
    })

    it("Test 10 - Get other user board data with permission", () => {
        board.get({boardId : 7943});
    })

    it("Test 11 - Get deleted board data", () => {
        board.get({boardId : 10252, statusCode : 404, statusText : "Not Found"});
    })

    it("Test 12 - Get board data", () => {
        board.get({});
    })



})
