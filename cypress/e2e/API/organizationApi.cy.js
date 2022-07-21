
import organization from "../../fixtures/apiMock/organization"
import login from "../../fixtures/apiMock/login"

describe('Organization', () => {
    let organizationID = ""

    beforeEach(() => {
        login.post({assert: false})
    })

    it('Create organization without title', () => {
        organization.post({
            name: '',
            statusCode: 400,
            statusText: "Bad Request"
        }).then(response => {
            expect(response.body.name[0]).eql("The name field is required.");
        })
    })

    it('Create organization', () => {
        organization.post({
            statusCode: 201,
            statusText: "Created"
        }).then(response => {
            organizationID = response.body.id
            expect(response.body.name).eq('Organizacija')
        })
    })

    it('All organizations', () => {
        organization.get({}).then(response => {
            expect(response.body).to.be.a('array')
            expect(response.body.length).to.be.gt(0)
        })
    })

    it('Edit organization without name', () => {
        organization.putOrganization({
            name:"",
            statusCode: 400,
            statusText: "Bad Request",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.name[0]).eql("The name field is required.");
        })
    })

    it('Edit organization without vacation days', () => {
        organization.putVacationDays({
            additionalDays: "",
            days: "",
            expirationDate: "",
            workingMonths: "",
            statusCode: 422,
            statusText: "Unprocessable Entity",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.additionalDays[0]).eql("The additional days field is required.");
            expect(response.body.days[0]).eql("The days field is required.");
            expect(response.body.expirationDate[0]).eql("The expiration date field is required.");
            expect(response.body.workingMonths[0]).eql("The working months field is required.");
        })
    })

    it('Edit organization', () => {
        organization.putOrganization({organizationID: organizationID}).then(response => {
            expect(response.body.name).eq('Organizacija 2')
            expect(response.body.id).eq(organizationID)
        })
    })

    it('Delete organization with wrong password', () => {
        organization.delete({
            passwordOrEmail: "34141",
            statusCode: 403,
            statusText: "Forbidden",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.errors[0]).eq("You entered the wrong password!")
        })
    })

    it('Delete organization without password', () => {
        organization.delete({
            passwordOrEmail: "34141",
            statusCode: 403,
            statusText: "Forbidden",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.errors[0]).eq("You entered the wrong password!")
        })
    })

    it('Delete organization', () => {
        organization.delete({
            statusCode: 201,
            statusText: "Created",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.id).eq(organizationID)
        })
    })

    it('Delete an organization that has already been deleted', () => {
        organization.delete({
            statusCode: 403,
            statusText: "Forbidden",
            organizationID: organizationID
        }).then(response => {
            expect(response.body.errors[0]).eq("You don't have permission to manage this Organization")
        })
    })
})