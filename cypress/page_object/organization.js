

class Organization {

    get addNewBtn() {
        return cy.contains('Add New')
    }

    get addOrganizationBtn() {
        return cy.contains('Add Organization')
    }


    get organizationName() {
        return cy.get('input[name="name"]')
    }

    get organizationTitle() {
        return cy.get("h2").contains('New Organization')
    }

    get organization() {
        return cy.get('a[class="vs-c-list__btn vs-c-list__organisation"]').last()
    }

    Organization(title,url) {

        if(title) {
        this.organizationName.type(title)
        }
    }
}

export const organization = new Organization