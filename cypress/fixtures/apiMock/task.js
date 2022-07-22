module.exports = {

    post({
        name = "Task",
        sprint_id = null,
        boardID = "",
        statusCode = 200,
        statusText = "OK",
        isOnSprint = true
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('baseAPI')}tasks`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
            body: {
                board_id: boardID,
                isOnSprint: isOnSprint,
                    item: {
                        name: name,
                        board_id: boardID,
                        sprint_id: sprint_id
                    }
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    get({
        boardID = "",
        statusCode = 200,
        statusText = "OK",
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('baseAPI')}boards/${boardID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    put({
        taskID = "",
        name = "Task2",
        description = "testtest",
        pointsID = null,
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('baseAPI')}tasks/${taskID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
            body: {
                name: name,
                description: description,
                points_id: pointsID
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
            console.log(response)
        })
    },

    delete({
        taskID = "",
        statusCode = 200,
        statusText = "OK",
        boardID = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('baseAPI')}tasks/${taskID}?boardId=${boardID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
            console.log(response)
        })
    }
}
