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

    loginUserWithUI(email, password) {
        cy.intercept({
            method: 'POST',
            url: ''
        }).as('sucessfullLogin');

        this.loginEmailInput.type(email);
        this.loginPasswordInput.type(password);
        this.loginButton.click();

        cy.wait('@sucessfullLogin').then(interception => {
            expect(interception.response.statusCode).eql(200);
            expect(interception.response.statusMessage).eql('OK');
        })
    }

    loginWithoutAssertions(email, password) {

        this.loginEmailInput.type(email);
        this.loginPasswordInput.type(password);
        this.loginButton.click();

    }
}

export const loginPage = new Login();