import login from "../../fixtures/apiMock/login";
import board from "../../fixtures/apiMock/board";

describe("Create board", () => {

    let boardId = "";
    let boardIdDifferentOrg = "";
    let scrumBoardId = "";

    beforeEach('user login', () => {
        login.post({
            assert : false
        });
    });

    it("Test 1 - Create board without name", () => {
        board.post({
            name : "",
            statusCode : 422,
            statusText: "Unprocessable Entity"
        }).then(response => {
            expect(response.body.name[0]).eql("The name field is required.");
        });
    });

    it("Test 2 - Create board without type", () => {
        board.post({
            type : "",
            statusCode : 422,
            statusText: "Unprocessable Entity"
        }).then(response =>
            {
                expect(response.body.type[0]).eql("The type field is required.");
            });
    });

    it("Test 3 - Create board with invalid board type", () => {
        board.post({
            type : "some_board",
            statusCode : 422,
            statusText: "Unprocessable Entity"
        }).then(response =>
            {
                expect(response.body.type[0]).eql("The selected type is invalid.");
            });
    });

    it("Test 4 - Create board without logging in", () => {
        board.post({
            token : "",
            statusCode : 401,
            statusText: "Unauthorized"
        }).then(response => {
            expect(response.body.message).eql("Token not provided");
        })
    });

    it("Test 5 - Create board with valid data", () => {
        board.post({}).then(response => {
            boardId = response.body.id;
        })
    });

    it("Test 6 - Create board in different organization", () => {
        board.post({
            organization_id : 20309
        }).then(response => {
            boardIdDifferentOrg = response.body.id;
        });
    });

    it("Test 7 - Create board valid data - scrum board", () => {
        board.post({
            type : "scrum_board"
        }).then(response => {
            scrumBoardId = response.body.id;
        });
    });

    it("Test 8 - Get non-existing board data", () => {
        board.get({
            boardId : 99999,
            statusCode : 404,
            statusText : "Not Found"
        });
    });

    it("Test 9 - Get other user board data", () => {
        board.get({
            boardId : 7959,
            statusCode : 403,
            statusText : "Forbidden"
        });
    });

    it("Test 10 - Get other user board data as team member", () => {
        board.get({
            boardId : 7943
        });
    });

    it("Test 11 - Get deleted board data", () => {
        board.get({
            boardId : 10318,
            statusCode : 404,
            statusText : "Not Found"
        });
    });

    it("Test 12 - Get board data", () => {
        board.get({});
    });

    it("Test 11 - Update board data without logging in", () => {
        board.put({
            token : "",
            statusCode : 401,
            statusText: "Unauthorized"
        });
    });

    it("Test 12 - Update board data without board id", () => {
        board.put({
            boardId : "",
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 13 - Update board data without name", () => {
        board.put({
            name : "",
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 14 - Update board data with null as name value", () => {
        board.put({
            name : null,
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 15 - Update board data with array as name value", () => {
        board.put({
            name : [2,3,[22,11]],
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 16 - Update board data with object as name value", () => {
        board.put({
            name : {name : "New name"},
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 17 - Update board data with empty string as name value", () => {
        board.put({
            name : "      ",
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 18 - Update board data with name that has more than 50 characters", () => {
        board.put({
            name : "mmmvlkfvlkmvlkmflmlkmflvkdmflkvdmfldkmfkmlkmlmlkmll",
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 19 - Update board data on deleted board", () => {
        board.put({
            boardId : 10318,
            statusCode : 404,
            statusText: "Not Found"
        });
    });

    it("Test 20 - Update board data for non-existing board", () => {
        board.put({
            boardId : 99999,
            statusCode : 404,
            statusText: "Not Found"
        });
    });

    it("Test 21 - Update board data without board code", () => {
        board.put({
            code : "",
            statusCode : 400,
            statusText: "Bad Request"
        });
    });

    it("Test 22 - Update board data on other user account", () => {
        board.put({
            boardId : 7945,
            statusCode : 403,
            statusText: "Forbidden"
        });
    });

    it("Test 23 - Update board name on other user account - non admin role", () => {
        board.put({
            name: "Ivana update",
            code : "DODA",
            boardId : 7945,
            statusCode : 403,
            statusText: "Forbidden"
        });
    });

    it("Test 24 - Update board name on other user account - admin role", () => {
        board.put({
            name: "Ivana update",
            code : "DODA",
            boardId : 7943
        });
    });

    it("Test 25 - Update board data", () => {
        board.put({});
    });

    it("Test 26 - Update board data with empty description", () => {
        board.put({
            description : ""
        });
    });

    it("Test 27 - Delete non-existing board", () => {
        board.delete({
            boardId : 99999,
            statusCode : 404,
            statusText : "Not Found"
        });
    });

    it("Test 28 - Delete deleted board", () => {
        board.delete({
            boardId : 10318,
            statusCode : 404,
            statusText : "Not Found"
        });
    });

    it("Test 29 - Delete board without loggin in", () => {
        board.delete({
            boardId : 10325,
            statusCode : 401,
            statusText : "Unauthorized",
            token : ""
        });
    });

    it("Test 30 - Delete other user board", () => {
        board.delete({
            boardId : 7945,
            statusCode : 401,
            statusText : "Unauthorized"
        });
    });

    it("Test 32 - Delete other user board - non-admin role", () => {
        board.delete({
            boardId : 7957,
            statusCode : 401,
            statusText : "Unauthorized"
        });
    });

    it("Test 33 - Delete board", () => {
        board.delete({
            boardId : boardId
        });
    });

    it("Test 34 - Delete board from different organization", () => {
        board.delete({
            boardId : boardIdDifferentOrg
        });
    });

    it("Test 35 - Delete scrum board", () => {
        board.delete({
            boardId : scrumBoardId
        });
    });
});
