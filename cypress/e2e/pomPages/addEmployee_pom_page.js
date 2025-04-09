import { enterTextboxByParent, getElementByAnyClass, getElementByName, getElementByTagAndText, getElementByText } from "../../support/cypressLibrary"
import addEmployeeLocators from "../../support/locators/addEmployeePageLocators.json"




export class AddEmployeePage {


    enterFirstName(firstnameText) {
        getElementByName(addEmployeeLocators.firsname_textbox_name).type(firstnameText)
    }

    enterMiddleName(middlenameText) {
        getElementByName(addEmployeeLocators.middlename_textbox_name).type(middlenameText)
    }

    enterLastName(lastnameText) {
        getElementByName(addEmployeeLocators.lastname_textbox_name).type(lastnameText)
    }

    enterEmployeeId(employeeidText) {
        enterTextboxByParent(addEmployeeLocators.employeeid_textbox_parent_label, addEmployeeLocators.employeeid_textbox_parent_text, addEmployeeLocators.employeeid_textbox_child_label, addEmployeeLocators.employeeid_textbox_child_class, employeeidText)
    }

    clickOnSaveButton() {
        getElementByText(addEmployeeLocators.save_button_text).click()
    }

    

}