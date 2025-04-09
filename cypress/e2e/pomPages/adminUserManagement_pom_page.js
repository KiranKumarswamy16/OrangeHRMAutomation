import { deleteRowByCellText, getSiblingText, getElementByTagAndAttribute, selectDropdownByParent, enterTextboxByParent, getElementByAnyClass, getElementByName, getElementByTagAndText, getElementByText, enterTextboxByClosest } from "../../support/cypressLibrary"
import adminUserManagementLocators from "../../support/locators/adminUserManagementPageLocators.json"





export class AdminUserManagementPage {

    clickOnAddButton() {
        getElementByTagAndText(adminUserManagementLocators.add_button_tag, adminUserManagementLocators.add_button_text).click()
    }

    selectUserRoleDropdown() {
        selectDropdownByParent(adminUserManagementLocators.userRole_dropdown_parent_tag, adminUserManagementLocators.userRole_dropdown_parent_text, adminUserManagementLocators.userRole_dropdown_child_tag, adminUserManagementLocators.userRole_dropdown_child_class, adminUserManagementLocators.userRole_dropdown_child_text)
    }

    selectUserStatusDropdown() {
        selectDropdownByParent(adminUserManagementLocators.userStatus_dropdown_parent_tag, adminUserManagementLocators.userStatus_dropdown_parent_text, adminUserManagementLocators.userStatus_dropdown_child_tag, adminUserManagementLocators.userStatus_dropdown_child_class, adminUserManagementLocators.userStatus_dropdown_child_text)
    }

    enterEmployeeNameTextbox(employeeNameText) {
        getElementByTagAndAttribute(adminUserManagementLocators.employeeName_textbox_tag, adminUserManagementLocators.employeeName_textbox_attribute_name, adminUserManagementLocators.employeeName_textbox_attribute_text).type(employeeNameText)
    }

    clickOnPopupEmployeeName() {
        getElementByText(adminUserManagementLocators.searched_employee_textbox_popup_text).click()
    }

    enterUsernameTextbox(userNameText) {
        enterTextboxByParent(adminUserManagementLocators.userName_textbox_parent_tag, adminUserManagementLocators.userName_textbox_parent_text, adminUserManagementLocators.userName_textbox_child_tag, adminUserManagementLocators.userName_textbox_child_class, userNameText)
    }

    enterPasswordTextbox(userPasswordText) {
        enterTextboxByParent(adminUserManagementLocators.password_textbox_parent_tag, adminUserManagementLocators.password_textbox_parent_text, adminUserManagementLocators.password_textbox_child_tag, adminUserManagementLocators.password_textbox_parent_class, userPasswordText)
    }

    enterConfirmPasswordTextbox(userConfirmPasswordText) {
        enterTextboxByParent(adminUserManagementLocators.confirmPassword_textbox_parent_tag, adminUserManagementLocators.confirmPassword_textbox_parent_text, adminUserManagementLocators.confirmPassword_textbox_child_tag, adminUserManagementLocators.confirmPassword_textbox_parent_class, userConfirmPasswordText)
    }

    clickOnSaveButton() {
        getElementByText(adminUserManagementLocators.save_button_text).click()
    }

    clickOnCancelButton() {
        getElementByText(adminUserManagementLocators.cancel_button_text).click()
    }

    enterCreatedEmployeeNameTextbox(createdEmployeeNameText) {
        getElementByTagAndAttribute(adminUserManagementLocators.employeeName_textbox_tag, adminUserManagementLocators.employeeName_textbox_attribute_name, adminUserManagementLocators.employeeName_textbox_attribute_text).type(createdEmployeeNameText)
    }

    enterCreatedEmployeeUsernameTextbox(createdEmployeeUserNameText) {
        enterTextboxByClosest(adminUserManagementLocators.search_username_parent_tag, adminUserManagementLocators.search_username_parent_text, adminUserManagementLocators.search_username_ancestor_class, adminUserManagementLocators.search_username_child_tag, adminUserManagementLocators.search_username_child_class, createdEmployeeUserNameText)
    }

    clickOnSearchButton() {
        getElementByTagAndText(adminUserManagementLocators.search_button_tag, adminUserManagementLocators.search_button_text).click()
    }

    clickOnUserRoleUsernameDeleteButton() {
        deleteRowByCellText(adminUserManagementLocators.delete_user_role_emp_sibling_class, adminUserManagementLocators.delete_user_role_emp_sibling_text, adminUserManagementLocators.delete_user_role_emp_container_class, adminUserManagementLocators.delete_user_role_emp_traget_element_class)
    }

    clickOnConfirmationPopupYesDeleteButton() {
        getElementByText(adminUserManagementLocators.yes_delete_popup_message).click()
        
    }

}