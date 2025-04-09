
import { getElementByAnyClass, getElementByComplexCSS, getElementByTagAndClass, getElementByText } from '../../support/cypressLibrary';
import dashboardLocators from '../../support/locators/dashboardPageLocators.json'

export class DashboardPage {


    clickOnAttendancePunchInClockButton() {
        getElementByComplexCSS(dashboardLocators.attendance_punchin_button_class).click()
    }

    clickOnAdminSubMenu() {
        getElementByText(dashboardLocators.admin_submenu_button_text).click()
    }

    clickOnPIMSubMenu() {
        getElementByText(dashboardLocators.pim_submenu_button_text).click()
    }

    clickOnAddEmployeeButton() {
        getElementByText(dashboardLocators.add_employee_button_text).click()
    }

    clickOnEmployeeListButton() {
        getElementByText(dashboardLocators.employee_list_button_text).click()
    }

}