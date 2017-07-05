//Sheet variables to make things easy.
var ss = SpreadsheetApp.getActive();
var births = ss.getSheetByName('Birthdays');

function birthdays() {

    //Dates and formats
    const dateFormat = "MM/dd";
    var dateToday = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd");
    var lastRow = births.getLastRow();


    //The magic loop through all rows
    for (var i = 2; i <= lastRow; ++i) {

        //Variables that change, can't be set as let in Google App Script
        var targetDate = new Date(births.getRange(i, 7).getValue());
        var nickName = births.getRange(i, 3).getValue();
        var smsText = births.getRange(i, 8).getValue();
        var birthdayEmail = births.getRange(i, 9).getValue();
        var sentVerificationCell = births.getRange(i, 12);
        var isMessageBlank = births.getRange(i, 8).isBlank();

        const myCarrierPhoneEmail = '4357735808@vtext.com';
        const timeZone = Session.getScriptTimeZone();
        const timeStamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy hh:mm");

        //Put the variables to use, if the message isn't blank and the date is their birthday
        if (!isMessageBlank && dateToday == Utilities.formatDate(targetDate, timeZone, dateFormat)) {
            //Send the email text to them and a reminder to myself
            MailApp.sendEmail(birthdayEmail, "", smsText);
            MailApp.sendEmail(myCarrierPhoneEmail, "", "You just text " + nickName + " \'" + smsText + "\'.");

            //Save a timestamp to the last cell of their row so I know it sent as well.
            sentVerificationCell.setValue("Sent " + timeStamp);
        }
    }
}