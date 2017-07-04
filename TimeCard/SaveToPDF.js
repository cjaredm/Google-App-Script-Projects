//This function saves the sheets to a pdf and emails it as a method to keep backups.
function SaveData() {
    //Sheets Var List
    const ss = SpreadsheetApp.getActive();
    const dataSheet = ss.getSheetByName('Form Responses 1');
    const info = ss.getSheetByName('EmployeeInfo');

    //Today's Date
    const now = Utilities.formatDate(new Date(), Session.getTimeZone(), "MM/dd/yyyy");

    //Email Fields
    const email = info.getRange(2, 6).getDisplayValue();
    const subject = "COMPANY TimeClock as of " + now;
    const body = "Monthly file backup of COMPANY TimeClock. -cJaredm";

    //Drive File Attachments (Google search for how you find the ID for your Drive File)
    const saveclock = DriveApp.getFileById("#################");

    //Send the email with the pdf of the Google Sheet attached.
    MailApp.sendEmail(email, subject, body, { attachments: [saveclock] });
}