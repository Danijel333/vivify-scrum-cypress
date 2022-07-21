module.exports = {


    post({

        name = "Organizacija",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode : false,
            method : 'POST',
            url : `${Cypress.env('baseAPI')}organizations`,
            headers : {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept" : 'application/json'
            },
            body : {
               name: name
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    get({

        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode : false,
            method : 'GET',
            url : `${Cypress.env('baseAPI')}my-organizations`,
            headers : {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept" : 'application/json'
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    putOrganization({

        name = "Organizacija 2",
        organizationID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode : false,
            method: 'PUT',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept" : 'application/json'
            },
            body: {
                name: name
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    putVacationDays({

        organizationID = "",
        statusCode = 200,
        statusText = "OK",
        additionalDays = "2",
        days = "3",
        expirationDate = "2",
        workingMonths = "18"
    }) {
        return cy.request({
            failOnStatusCode : false,
            method: 'PUT',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}/vacation-days`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept" : 'application/json'
            },
            body: {

                additionalDays: additionalDays,
                days: days,
                expirationDate: expirationDate,
                workingMonths: workingMonths

            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    delete({

        passwordOrEmail = "12345",
        organizationID = "",
        statusCode = 200,
        statusText = "OK"
    }) {
        return cy.request({
            failOnStatusCode : false,
            method: 'POST',
            url: `${Cypress.env('baseAPI')}organizations/${organizationID}`,
            headers: {
                "Authorization": 'Bearer ' +  window.localStorage.getItem('token'),
                "Accept" : 'application/json'
            },
            body: {
                passwordOrEmail: passwordOrEmail
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },


}