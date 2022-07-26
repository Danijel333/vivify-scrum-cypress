module.exports = {

    post({
        title = "Checklist 3",
        taskID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('baseAPI')}tasks/${taskID}/checklists`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
            body: {
                title: title
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    put({
        title = "Checklist 55",
        taskID = "",
        checklistID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('baseAPI')}tasks/${taskID}/checklists/${checklistID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
            body: {
                title: title,
                id: checklistID,
                task_id: taskID
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    get({
        taskID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('baseAPI')}tasks/${taskID}/data`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    delete({
        taskID = "",
        checklistID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('baseAPI')}tasks/${taskID}/checklists/${checklistID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    }
}