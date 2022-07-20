import login from "../../fixtures/apiMock/login";
import board from "../../fixtures/apiMock/board";

describe("Create board", () => {

    beforeEach('user login', () => {
        login.post({assert : false});
    })

    it("Test 1 - Create board with valid data", () => {
        board.post({});
    })

    it("Test 2 - Create board in different organization", () => {
        board.post({organization_id : 20303});
    })

    it("Test 3 - Create board valid data - scrum board", () => {
        board.post({type : "scrum_board"});
    })

    it("Test 4 - Create board without name", () => {
        board.post({name : "", statusCode : 422, statusText: "Unprocessable Entity"});
    })

    it("Test 5 - Create board without type", () => {
        board.post({type : "", statusCode : 422, statusText: "Unprocessable Entity"});
    })

    it("Test 6 - Create board with invalid board type", () => {
        board.post({type : "some_board", statusCode : 422, statusText: "Unprocessable Entity"});
    })

    it("Test 7 - Create board without logging in", () => {
        board.post({token : "", statusCode : 401, statusText: "Unauthorized"});
    })



})
