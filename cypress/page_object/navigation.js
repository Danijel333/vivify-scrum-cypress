class Navigation{

    get nextBtn() {
        return cy.get('button[name="next_btn"]')
    }
}

export const navigation = new Navigation()