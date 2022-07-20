import login from "../../fixtures/apiMock/login"

describe("Login API tests", () => {
    
    it("Test 1 - Login using valid data", () => {
        login.post({})
    })

    it("Test 2 - Login without email", () => {
        login.post({email : "", statusCode : 401, statusText : "Unauthorized"})
    })

    it("Test 3 - Login without password", () => {
        login.post({password : "", statusCode : 401, statusText : "Unauthorized"})
    })

    it("Test 4 - Login with wrong email", () => {
        login.post({email : "mail@dddd.com", statusCode : 401, statusText : "Unauthorized"})
    })

    it("Test 5 - Invalid email format - missing domain", () => {
        login.post({email : "komatinaivana@.com", statusCode : 401, statusText : "Unauthorized"})

    })

    it("Test 6 - Invalid email format - missing username", () => {
        login.post({email : "@yahoo.com", statusCode : 401, statusText : "Unauthorized"})

    })

    it("Test 7 - Invalid email format - missing .com", () => {
        login.post({email : "komatinaivana@yahoo", statusCode : 401, statusText : "Unauthorized"})

    })

    it("Test 8 - Invalid password", () => {
        login.post({password : "somepass", statusCode : 401, statusText : "Unauthorized"})

    })

})