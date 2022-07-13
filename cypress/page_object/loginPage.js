class Login {

    get loginPageBackground() {
        return cy.get('div[class="vs-c-modal vs-c-modal--primary vs-c-modal--page vs-u-scroll-y-auto"]')
    }

    get homePageBackground() {
        return cy.get('div[class="vs-l-my-organizations__content"]');
    }

    get loginEmailInput() {
        return cy.get('input[name="email"]');
    }

    get loginPasswordInput() {
        return cy.get('input[name="password"]').first();
    }

    get loginButton() {
        return cy.get('form[class="el-form"]')
            .find('button');
    }
}

export const loginPage = new Login();