/// <reference types= "cypress"/>

import { loginPage } from "../page_object/loginPage";
import { createBoard } from "../page_object/board";
import user from "../fixtures/users.json";
import {faker} from '@faker-js/faker';


describe('create new board', () => {

    let boardName = "";

    before('user login and validation', () => {
        cy.visit('');
        loginPage.loginUserWithUI(
            user.loginCredentials.user2.email,
            user.loginCredentials.user2.password
        );
        boardName = faker.name.jobTitle();
    })

    it('create new board with valid data',()=> {
        createBoard.addNewBoardWithAssert(
            boardName
        );
    })

    it('create board without title', () => {
        createBoard.addBoardWithoutTitle();
    })

})