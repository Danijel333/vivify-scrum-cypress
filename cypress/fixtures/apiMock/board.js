module.exports = {

    post({
        name = "Some name",
        type = "kanban_board",
        organization_id = 20300,
        statusCode = 201,
        statusText = "Created",
        token = window.localStorage.getItem('token')
    }) {
        return cy.request({
            failOnStatusCode : false,
            method : 'POST',
            url : `${Cypress.env('baseAPI')+'boards'}`,
            headers: {
                'Authorization' : 'Bearer ' + token,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : {
                name : name,
                type : type,
                organization_id : organization_id,
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        });
    },

    get({
        boardId = 10251,
        statusCode = 200,
        statusText = "OK",
        token = window.localStorage.getItem('token')
    }){
        cy.request({
            failOnStatusCode : false,
            method : 'GET',
            url : `${Cypress.env('baseAPI')+'boards/' + boardId}`,
            headers: {
                'Authorization' : 'Bearer ' + token,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
            statusCode === 200 ? cy.log("Board data : " + JSON.stringify(response.body)) : "";
        });
    },

    put({
        boardId = 10251,
        name = "New name",
        description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        code = "DAJA",
        statusCode = 200,
        statusText = "OK",
        token = window.localStorage.getItem('token')
    }){
        cy.request({
            failOnStatusCode : false,
            method : 'PUT',
            url : `${Cypress.env('baseAPI')+'boards/' + boardId}`,
            headers: {
                'Authorization' : 'Bearer ' + token,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : {
                name : name,
                description : description,
                code : code

            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        });
    },

    delete({
        boardId,
        statusCode = 200,
        statusText = "OK",
        token = window.localStorage.getItem('token')
    }){
        return cy.request({
            failOnStatusCode : false,
            method : 'DELETE',
            url : `${Cypress.env('baseAPI')+'boards/' + boardId}`,
            headers: {
                'Authorization' : 'Bearer ' + token,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        });
    }

}