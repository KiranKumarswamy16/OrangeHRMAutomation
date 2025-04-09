
import { getElementByAnyClass, getElementByTagAndText } from "../../support/cypressLibrary"
import attendanceLocators from "../../support/locators/attendancePageLocators.json"




export class AttendancePage {

    enterAttendancePunchInNote(punchInNoteText) {
        getElementByAnyClass(attendanceLocators.attendance_punchin_note_textbox_class).type(punchInNoteText)
    }

    clickOnPunchInButton() {
        getElementByTagAndText(attendanceLocators.punchIn_button_type, attendanceLocators.punchIn_button_text).click()
    }

    clickOnPunchOutButton() {
        getElementByTagAndText(attendanceLocators.punchOut_button_type, attendanceLocators.punchOut_button_text).click()
    }

}