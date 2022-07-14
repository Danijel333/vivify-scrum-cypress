class Navigation{

    get nextBtn() {
        return cy.get('button[name="next_btn"]')
    }

    get configurationBtn() {
        return cy.get('a[class="vs-c-site-logo"]').last()
    }

    get deleteBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]')
    }

    get boardOkBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button"]')
    }

    get yesBtn() {
        return cy.get('button[name="save-btn"]')
    }
}

export const navigation = new Navigation()