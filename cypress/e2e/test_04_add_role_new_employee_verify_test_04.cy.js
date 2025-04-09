import {selectDropdownByParent, enterTextboxByParent, selectDropdownByClosest, enterTextboxByClosest, getElementByTagAndAttribute, getElementById, getElementByName, getElementByAnyClass, getElementByText, getElementByTagAndText, enterTextboxByNearParents, getElementByTagAndClass, clickOnElementInsideClass, getSiblingText} from '../support/cypressLibrary'; // Import utility functions

import { AdminUserManagementPage } from "./pomPages/adminUserManagement_pom_page";
// import { EmployeeListPage } from "./pomPages/employeeList_pom_page";
// import { AddEmployeePage } from "./pomPages/addEmployee_pom_page";
// import { AttendancePage } from "./pomPages/attendance_pom_page";
import { DashboardPage } from "./pomPages/dashboard_pom_page";
import { LoginPage } from "./pomPages/login_pom_page";
import {BASE_URL, DELAYS, PAGE_TITLES} from '../constants/projectConstants';
import { waitForElementToLoad, assertText } from '../support/utils'; // Import utility functions
import {visitOrangeHRMApplication} from "../support/navigation"




const loginPage = new LoginPage
const dashboardPage = new DashboardPage
// const attendancePage = new AttendancePage
// const addEmployeePage = new AddEmployeePage
// const employeeListPage = new EmployeeListPage
const adminUserManagementPage = new AdminUserManagementPage

let adminUserManagementData;
let employeeListData;
let addEmployeeData;
let loginData;


function loginWithValidUser() {
    cy.log("Logging in...");
    loginPage.enterUsername(loginData.validUsernamePassword.username);
    loginPage.enterPassword(loginData.validUsernamePassword.password);
    loginPage.clickOnLogin();
    assertText(PAGE_TITLES.home);
  }

describe("New Created Employee Tests", function() {
    before(function () {
        cy.fixture('adminUserManagementPageTestData.json').then((adminUserManagement) => {
          adminUserManagementData = adminUserManagement;
      
          cy.fixture('employeeListPageTestData.json').then((employeeList) => {
            employeeListData = employeeList;
      
            cy.fixture('addEmployeePageTestData.json').then((addEmployee) => {
              addEmployeeData = addEmployee;
      
              cy.fixture('loginPageTestData.json').then((login) => {
                loginData = login;
              });
            });
          });
        });
      });
      

    beforeEach(function () {
        visitOrangeHRMApplication();
    });

    afterEach(() => {
        cy.wait(2000);
    });

    after(() => {
        cy.log('All test cases completed');
    });


    it("New Employee Created Tests Validation 01", function() {
        loginWithValidUser()
        dashboardPage.clickOnAdminSubMenu()
        adminUserManagementPage.clickOnAddButton()

        adminUserManagementPage.selectUserRoleDropdown()
        adminUserManagementPage.selectUserStatusDropdown()

        adminUserManagementPage.enterEmployeeNameTextbox(adminUserManagementData.addUserTestDataCase1.employeename)
        adminUserManagementPage.clickOnPopupEmployeeName()

        adminUserManagementPage.enterUsernameTextbox(adminUserManagementData.addUserTestDataCase1.username)

        adminUserManagementPage.enterPasswordTextbox(adminUserManagementData.addUserTestDataCase1.password)
        adminUserManagementPage.enterConfirmPasswordTextbox(adminUserManagementData.addUserTestDataCase1.confirmPassword)

        adminUserManagementPage.clickOnSaveButton()
        waitForElementToLoad(8000)
        assertText(adminUserManagementData.addUserTestDataCase1.username)
        adminUserManagementPage.enterCreatedEmployeeUsernameTextbox(adminUserManagementData.addUserTestDataCase1.username)
        waitForElementToLoad()
        adminUserManagementPage.clickOnSearchButton()
        assertText(adminUserManagementData.addUserTestDataCase1.newlyCreatedEmployeeText)


    
    })


    it("Create Role for same User Tests Validation 01", function() {
        loginWithValidUser()
        dashboardPage.clickOnAdminSubMenu()
        adminUserManagementPage.clickOnAddButton()

        adminUserManagementPage.selectUserRoleDropdown()
        adminUserManagementPage.selectUserStatusDropdown()

        adminUserManagementPage.enterEmployeeNameTextbox(adminUserManagementData.addUserTestDataCase1.employeename)
        adminUserManagementPage.clickOnPopupEmployeeName()

        adminUserManagementPage.enterUsernameTextbox(adminUserManagementData.addUserTestDataCase1.username)
        assertText(adminUserManagementData.addUserTestDataCase1.usernameExistText)



    })


})

