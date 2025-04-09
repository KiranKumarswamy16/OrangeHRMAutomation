import { deleteRowByCellText, enterTextboxByClosest, enterTextboxByNearParents, enterTextboxByParent, getElementByAnyClass, getElementByName, getElementByTagAndText, getElementByText } from "../../support/cypressLibrary"
import employeeListLocators from "../../support/locators/employeeListPageLocators.json"




export class EmployeeListPage {


    enterEmployeeName(employeeNameText) {
        enterTextboxByNearParents(employeeListLocators.employee_name_textbox_child_tag, employeeListLocators.employee_name_textbox_child_text, employeeListLocators.employee_name_textbox_parent_class, employeeListLocators.employee_name_textbox_parent_sibling_any_child_attribute, employeeNameText)
    }

    enterEmployeeId(employeeIdText) {
        enterTextboxByClosest(employeeListLocators.employee_id_textbox_child_tag, employeeListLocators.employee_id_textbox_child_text, employeeListLocators.employee_id_textbox_parent_class, employeeListLocators.employee_id_textbox_parent_sibling_child_tag, employeeListLocators.employee_id_textbox_parent_sibling_child_class, employeeIdText)
    }

    clickOnPopupEmployeeName() {
            getElementByText(employeeListLocators.searched_employee_textbox_popup_text).click()
        }

    clickOnSearchButton() {
        getElementByTagAndText(employeeListLocators.search_button_tag, employeeListLocators.search_button_text).click()
    }

    clickOnResetButton() {
        getElementByTagAndText(employeeListLocators.reset_button_tag, employeeListLocators.reset_button_text).click()
    }

    clickOnEmployeeListEmployeeIdDeleteButton() {
        deleteRowByCellText(employeeListLocators.delete_employee_list_emp_sibling_class, employeeListLocators.delete_employee_list_emp_sibling_text, employeeListLocators.delete_employee_list_emp_container_class, employeeListLocators.delete_employee_list_emp_traget_element_class)
    }

    clickOnConfirmationPopupYesDeleteButton() {
        getElementByText(employeeListLocators.yes_delete_popup_message).click()
        
    }

}