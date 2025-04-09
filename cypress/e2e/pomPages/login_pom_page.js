import {getElementByName, getElementByAnyClass, getElementByTagAndText} from '../../support/cypressLibrary';
import loginLocators from '../../support/locators/loginPageLocators.json';




export class LoginPage {

    enterUsername(username) {
        getElementByName(loginLocators.usernameTextboxName).type(username)
    }

    enterPassword(password) {
        getElementByName(loginLocators.passwordTextboxName).type(password)
    }

    clickOnLogin() {
        getElementByAnyClass(loginLocators.loginButtonClass).click()
    }

    clickOnUserLogDropdown() {
        getElementByAnyClass(loginLocators.userDropdownClass).click()
    }

    clickOnLogut() {
        getElementByTagAndText(loginLocators.logoutButtonTag, loginLocators.logoutButtonText).click()

    }
}