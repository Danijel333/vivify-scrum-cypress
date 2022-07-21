module.exports = {

    post({
        name = 'Allen Brown',
        email = 'Kassandra4@hotmail.com',
        phone = '961-770-7727',
        address = "5786 Little Summit",
        organizationID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}/clients`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
            body: {
               name: name,
               email: email,
               phone: phone,
               address: address
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    get({
        organizationID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}/clients?page=1`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    put({
        name = 'Alice Peter',
        email = 'Kassandra4@hotmail.com',
        phone = '961-770-7727',
        address = "5786 Little Summit",
        organizationID = "",
        clientID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}/clients/${clientID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept": 'application/json'
            },
            body: {
                name: name,
                email: email,
                phone: phone,
                address: address
             }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    delete({
        organizationID = "",
        clientID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}/clients/${clientID}`,
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