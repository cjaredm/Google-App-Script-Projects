function leaseReminder() {
    const ss = SpreadsheetApp.getActive().getActiveSheet(); //This creates a shortcut name for the active spreadsheet. 
    const dateToday = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy"); //This creates a variable for today's date to refer to in a specific format.
    const lastRow = ss.getLastRow(); //This finds the total number of rows in the sheet with data in it to run through or else it loops forever in the spreadsheet or breaks.
    const template = HtmlService.createTemplateFromFile("ReminderEmail"); //This creates a variable for the HTML email we've created.

    //When triggered this will look for anyone it needs to email.
    for (var i = 2; i <= lastRow; ++i) {
        if (ss.getRange(i, 9).isBlank() == false && dateToday == Utilities.formatDate(ss.getRange(i, 9).getValue(), Session.getScriptTimeZone(), "MM/dd/yyyy"))

        //Create the HTML variables for the template email.
        {
            var email = ss.getRange(i, 4).getValue();
            template.todayDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
            template.name = ss.getRange(i, 1).getValue();
            template.street = ss.getRange(i, 2).getValue();
            template.cityState = ss.getRange(i, 3).getValue();
            template.reminderDate = ss.getRange(i, 8).getValue();
            template.expireDate = Utilities.formatDate(ss.getRange(i, 8).getValue(), Session.getScriptTimeZone(), "EEE MMMM dd, yyyy");
            template.annual = ss.getRange(i, 11).getValue();
            template.monthToMonth = ss.getRange(i, 12).getValue();

            //This is how you send the email in form of (Receipient, Subject, Body, attachment)
            //This email is to the renter
            MailApp.sendEmail(email, "Your lease expires next week", "", { htmlBody: template.evaluate().getContent(), });
            ss.getRange(i, 13).setValue("Sent " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy hh:mm"));

            //This email is to you letting you know the previous email was sent.
            MailApp.sendEmail("youremail@domain.com", "Reminder Lease Email Sent", "The following Lease Expiration Reminder was just sent to " + ss.getRange(i, 1).getValue(), { htmlBody: template.evaluate().getContent(), });
            ss.getRange(i, 13).setValue("Sent " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy hh:mm"));
        }
    }
}