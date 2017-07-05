//This creates a shortcut name for the active spreadsheet.  
const ss = SpreadsheetApp.getActive().getActiveSheet();

function leaseReminder() {

    //This creates a variable for today's date to refer to in a specific format.
    var dateToday = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
    var lastRow = ss.getLastRow();

    //This creates a variable for the HTML email we've created.
    var template = HtmlService.createTemplateFromFile("ReminderEmail");

    //When triggered this will look for anyone it needs to email.
    for (var i = 2; i <= lastRow; ++i) {
        var isReminderDateBlank = ss.getRange(i, 9).isBlank();
        var reminderDate = ss.getRange(i, 9).getValue();
        const dateFormat = "MM/dd/yyyy";
        const timeZone = Session.getScriptTimeZone();

        if (!isReminderDateBlank && dateToday == Utilities.formatDate(reminderDate, timeZone, dateFormat))

        { //Variables for the email template
            var sentVerificationCell = ss.getRange(i, 13);
            var email = ss.getRange(i, 4).getValue();
            const myEmail = "cjared.mortenson@gmail.com";
            const subject = "Your lease expires next week";
            const subjectToMe = "Reminder Lease Email Sent";
            var renterName = ss.getRange(i, 1).getValue();
            const timeStampFormat = "MM/dd/yyyy hh:mm";
            var timeStamp = Utilities.formatDate(new Date(), timeZone, timeStampFormat);

            template.todayDate = Utilities.formatDate(new Date(), timeZone, dateFormat);
            template.name = ss.getRange(i, 1).getValue();
            template.street = ss.getRange(i, 2).getValue();
            template.cityState = ss.getRange(i, 3).getValue();
            template.reminderDate = ss.getRange(i, 8).getValue();
            template.expireDate = Utilities.formatDate(ss.getRange(i, 8).getValue(), timeZone, "EEE MMMM dd, yyyy");
            template.annual = ss.getRange(i, 11).getValue();
            template.monthToMonth = ss.getRange(i, 12).getValue();

            //This email is to the renter          
            MailApp.sendEmail(email, subject, "", { htmlBody: template.evaluate().getContent(), });
            sentVerificationCell.setValue("Sent " + timeStamp);

            //This email is to you letting you know the previous email was sent         
            MailApp.sendEmail(myEmail, subjectToMe, "The following Lease Expiration Reminder was just sent to " + renterName, { htmlBody: template.evaluate().getContent(), });
        }
    }
}