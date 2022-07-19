module.exports = {

    post({
        email = "dan.janjic@gmail.com",
        password = "ovojesifra33",
        statusCode = 200,
    }) {
        cy.request({
            method : 'POST',
            url : `${Cypress.env('baseAPI')+'login'}`,
            body : {
                email : email,
                password : password
            }
        }).then(response => {

            return response.statusCode
            
        })
    }

}