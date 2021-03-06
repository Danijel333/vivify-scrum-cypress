module.exports = {

    post({
        email = "komatinaivana@yahoo.com",
        password = "12345",
        statusCode = 200,
        statusText = "OK",
        assert = true
    })  {
        cy.request({
            failOnStatusCode : false,
            method : 'POST',
            url : `${Cypress.env('baseAPI')+'login'}`,
            body : {
                email : email,
                password : password
            }
        }).then(response => {
            window.localStorage.setItem('token',response.body.token);
            if(assert){
                expect(response.status).eql(statusCode);
                expect(response.statusText).eql(statusText);
            }
        })
    }
}