function birthdays() {

    //Breakdown of Sheets
    const ss = SpreadsheetApp.getActive();
    const births = ss.getSheetByName('Birthdays');

    const dateToday = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd");
    const lastRow = births.getLastRow();

    //Cycle through each row on the sheet
    for (let i = 2; i <= lastRow; ++i) {

        //check to see if the birthdate is blank or not AND if the birthdate is today's date.
        if (births.getRange(i, 8).isBlank() == false && dateToday == Utilities.formatDate(births.getRange(i, 7).getValue(), Session.getScriptTimeZone(), "MM/dd")) {

            //Email the birthday person's SMS email address my personal message on their same row.
            MailApp.sendEmail(births.getRange(i, 9).getValue(), "", births.getRange(i, 8).getValue());
            //This sends SMS email to me letting me know that I text someone
            MailApp.sendEmail("5551234567@vtext.com", "", "You just text " + births.getRange(i, 3).getValue() + " \'" + births.getRange(i, 8).getValue() + "\'.");

            //This adds a message to the sheet that the text was sent and when.
            births.getRange(i, 12).setValue("Sent " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy hh:mm"));
        }
    }
}