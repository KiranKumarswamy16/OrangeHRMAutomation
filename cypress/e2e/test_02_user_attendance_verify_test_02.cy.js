import { AttendancePage } from "./pomPages/attendance_pom_page";
import { DashboardPage } from "./pomPages/dashboard_pom_page";
import { LoginPage } from "./pomPages/login_pom_page";
import {BASE_URL, DELAYS, PAGE_TITLES} from '../constants/projectConstants';
import { waitForElementToLoad, assertText } from '../support/utils';
import {visitOrangeHRMApplication} from "../support/navigation";




const loginPage = new LoginPage
const dashboardPage = new DashboardPage
const attendancePage = new AttendancePage
let attendanceData;
let loginData;


function loginWithValidUser() {
  // cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  cy.log("Logging in...");
  loginPage.enterUsername(loginData.validUsernamePassword.username);
  loginPage.enterPassword(loginData.validUsernamePassword.password);
  loginPage.clickOnLogin();
  assertText(PAGE_TITLES.home);
}




describe("attendance tests", function() {
  // before(function () {
  //     return Promise.all([
  //     cy.fixture('attendancePageTestData.json'),
  //     cy.fixture('loginPageTestData.json')
  //     ]).then(([attendance, login]) => {
  //     attendanceData = attendance;
  //     loginData = login;
  //     });
  // });

  before(function () {
    cy.fixture('attendancePageTestData.json').then((attendance) => {
      attendanceData = attendance;
    });
    cy.fixture('loginPageTestData.json').then((login) => {
      loginData = login;
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
    })


    it("User Attendance PunchIn Validation 01", function() {
        loginWithValidUser()
        // cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchedOutValidationText)
        dashboardPage.clickOnAttendancePunchInClockButton()
        assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchInValidationText)

        attendancePage.enterAttendancePunchInNote(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchInNote)
        attendancePage.clickOnPunchInButton()
        assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchInNote)
        assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchOutValidationText)
        waitForElementToLoad(60000)


        // attendancePage.clickOnPunchOutButton()
        // assertText(attendanceData.attendancePunchInPunchOutCase1.attendancePunchOutValidation)
        loginPage.clickOnUserLogDropdown();
        waitForElementToLoad()
        loginPage.clickOnLogut();
        assertText(PAGE_TITLES.login);

    })

    it("User Attendance PunchIn Validation 01", function() {
      loginWithValidUser()
      assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchedInValidationText)
      // cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")


      dashboardPage.clickOnAttendancePunchInClockButton()
      assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchOutValidationText)

      attendancePage.enterAttendancePunchInNote(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchOutNote)
      attendancePage.clickOnPunchOutButton()


      // attendancePage.clickOnPunchInButton()
      assertText(attendanceData.attendancePunchInPunchOutCase1.employeeAttendancePunchInValidationText)
      // waitForElementToLoad(15000)
      // attendancePage.clickOnPunchOutButton()
      // assertText(attendanceData.attendancePunchInPunchOutCase1.attendancePunchOutValidation)
      loginPage.clickOnUserLogDropdown();
      waitForElementToLoad()
      loginPage.clickOnLogut();
      assertText(PAGE_TITLES.login);

  })

})