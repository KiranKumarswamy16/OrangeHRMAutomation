import { EmployeeListPage } from "./pomPages/employeeList_pom_page";
import { AddEmployeePage } from "./pomPages/addEmployee_pom_page";
import { AttendancePage } from "./pomPages/attendance_pom_page";
import { DashboardPage } from "./pomPages/dashboard_pom_page";
import { LoginPage } from "./pomPages/login_pom_page";
import {BASE_URL, DELAYS, PAGE_TITLES} from '../constants/projectConstants';
import { waitForElementToLoad, assertText } from '../support/utils'; // Import utility functions
import {visitOrangeHRMApplication} from "../support/navigation"




const loginPage = new LoginPage
const dashboardPage = new DashboardPage
const attendancePage = new AttendancePage
const addEmployeePage = new AddEmployeePage
const employeeListPage = new EmployeeListPage
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
        dashboardPage.clickOnPIMSubMenu()
        dashboardPage.clickOnAddEmployeeButton()
        addEmployeePage.enterFirstName(addEmployeeData.addEmployeeTestData.firstname)
        // addEmployeePage.enterMiddleName(addEmployeeData.addEmployeeTestData.middlename)
        addEmployeePage.enterLastName(addEmployeeData.addEmployeeTestData.lastname)
        addEmployeePage.enterEmployeeId(addEmployeeData.addEmployeeTestData.employeeid)
        addEmployeePage.clickOnSaveButton()
        assertText(employeeListData.employeeListTestData.newlyCreatedEmployeeNameOnAddEmployeePage)
        loginPage.clickOnUserLogDropdown();
        waitForElementToLoad()
        loginPage.clickOnLogut();
        assertText(PAGE_TITLES.login);

    })

    it("Check New Employee Created Present In List 02", function() {
        loginWithValidUser()
        dashboardPage.clickOnPIMSubMenu()
        waitForElementToLoad()
        dashboardPage.clickOnEmployeeListButton()
        waitForElementToLoad()
        employeeListPage.enterEmployeeId(employeeListData.employeeListTestData.employeeIdTextboxText)
        // employeeListPage.enterEmployeeName(employeeListData.employeeListTestData.employeeNameTypeForHintsTextboxText)
        // employeeListPage.clickOnPopupEmployeeName(employeeListData.employeeListTestData.searchedEmployeeNameTextboxText)
        employeeListPage.clickOnSearchButton()
        assertText(employeeListData.employeeListTestData.searchedEmployeeNameTextboxText)
        loginPage.clickOnUserLogDropdown();
        waitForElementToLoad()
        loginPage.clickOnLogut();
        assertText(PAGE_TITLES.login);
      

    })

})

