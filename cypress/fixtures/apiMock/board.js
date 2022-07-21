module.exports = {

    post({
        name = "Some name",
        type = "kanban_board", 
        organization_id = 20300,
        statusCode = 201,
        statusText = "Created",
        token = window.localStorage.getItem('token')
    }) {
        cy.request({
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
            if(statusCode === 201){
                expect(response.body.organization_id).eql(organization_id);
            }else if(token === ""){
                expect(response.body.message).eql("Token not provided")
            }else if(name === "" || type === ""){
                if(name === ""){
                    expect(response.body.name[0]).eql("The name field is required.")
                }else if(type === ""){
                    expect(response.body.type[0]).eql("The type field is required.")
                }
            }else if(!(type === "scrum_board" && type === "kanban_board")){
                expect(response.body.type[0]).eql("The selected type is invalid.")
            }else{

            }
        })
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
        })
    }

}