import login from "../../fixtures/apiMock/login"
import organization from "../../fixtures/apiMock/organization"
import clients from "../../fixtures/apiMock/clients"

describe('Organization', () => {
    let organizationID = ""
    let clientID = ""

    beforeEach(() => {
        login.post({assert: false})
    })

    it('Create organization', () => {
        organization.post({statusCode: 201, statusText: "Created"}).then(response => {
            organizationID = response.body.id
        })
    })

    it('Add client without name', () => {
        clients.post({
            name: '',
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.name[0]).eq("The name field is required.")
        })
    })

    it('Add new client without email', () => {
        clients.post({
            email: "",
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.email[0]).eq("The email field is required.")
        })
    })

    it('Add new client with invalid email format', () => {
        clients.post({
            email: 'testtest',
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.email[0]).eq("The email format is invalid.")
        })
    })

    it('Add new client', () => {
        clients.post({organizationID: organizationID}).then(response => {
            expect(response.body.name).eq('Allen Brown')
            expect(response.body.organization_id).eq(organizationID.toString())
            clientID = response.body.id
        })
    })

    it('All clients', () => {
        clients.get({organizationID: organizationID}).then(response => {
            expect(response.body.data).to.be.a('array')
            expect(response.body.data.length).to.be.gt(0)
        })
    })

    it('Edit clients info without name', () => {
        clients.put({
            name: '',
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID,
            clientID: clientID
        }).then(response => {
            expect(response.body.name[0]).eq("The name field is required.")
        })
    })

    it('Edit clients info without email', () => {
        clients.put({
            email: '',
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID,
            clientID: clientID
        }).then(response => {
            expect(response.body.email[0]).eq("The email field is required.")
        })
    })

    it('Edit clients with invalid email format', () => {
        clients.put({
            email: 'testeste',
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID,
            clientID: clientID
        }).then(response => {
            expect(response.body.email[0]).eq("The email format is invalid.")
        })
    })

    it('Edit client', () => {
        clients.put({organizationID: organizationID, clientID: clientID}).then(response => {
            expect(response.body.id).eq(clientID)
            expect(response.body.organization_id).eq(organizationID)
            expect(response.body.name).eq("Alice Peter")
        })
    })

    it('Delete client', () => {
        clients.delete({organizationID: organizationID, clientID: clientID})
    })

    it('Delete a client that has already been deleted', () => {
        clients.delete({organizationID: organizationID, clientID: clientID})
    })

    it('Delete organization', () => {
        organization.delete({statusCode: 201, statusText: "Created", organizationID: organizationID})
    })
})