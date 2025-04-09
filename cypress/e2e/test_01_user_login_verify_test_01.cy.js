import {BASE_URL, DELAYS, PAGE_TITLES} from '../constants/projectConstants';
import {assertText, waitForElementToLoad } from '../support/utils';
import { LoginPage } from './pomPages/login_pom_page';
import { visitOrangeHRMApplication } from '../support/navigation';

const loginPage = new LoginPage();
let loginData;

describe('Login Tests', function () {
    // before(function () {
    //     return cy.fixture('loginPageTestData.json').then(function (data) {
    //     loginData = data;
    //     });
    before(function () {
        cy.fixture('loginPageTestData.json').then(function (data) {
          loginData = data;
        });
      });
      
    // });

    beforeEach(function () {
        visitOrangeHRMApplication(); //
    });

    afterEach(() => {
        cy.wait(2000);
    });

    after(() => {
        cy.log('All test cases completed');
    });

    it('Login User Validation with Valid Usrname and Password 01', function () {
        loginPage.enterUsername(loginData.validUsernamePassword.username);
        loginPage.enterPassword(loginData.validUsernamePassword.password);
        loginPage.clickOnLogin();
        assertText(PAGE_TITLES.home);
        loginPage.clickOnUserLogDropdown();
        waitForElementToLoad(5000)
        loginPage.clickOnLogut();
        waitForElementToLoad(5000)
        assertText(PAGE_TITLES.login);
    });

    it("Login User Validation with Invalid Username and Valid Password 02", function() {
        loginPage.enterUsername(loginData.invalidUsername.username)
        loginPage.enterPassword(loginData.invalidUsername.password)
        loginPage.clickOnLogin()
        assertText(PAGE_TITLES.invalidUsernameMessage)
    });

    it("Login User Validation with Valid Username and Invalid Password 03", function() {
        loginPage.enterUsername(loginData.invalidPassword.username)
        loginPage.enterPassword(loginData.invalidPassword.password)
        loginPage.clickOnLogin()
        assertText(PAGE_TITLES.invalidPasswordMessage)
    });

    it("Login User Validation with Empty Username and Empty Password 04", function() {
        loginPage.enterUsername(loginData.emptyUsernamePassword.username)
        loginPage.enterPassword(loginData.emptyUsernamePassword.password)
        loginPage.clickOnLogin()
        assertText(PAGE_TITLES.emptyUsernamePasswordMessage)

    });

});



