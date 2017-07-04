function eReport() {
    //Sheets Var List
    var ss = SpreadsheetApp.getActive();
    var info = ss.getSheetByName('EmployeeInfo');

    var JakeData = ss.getSheetByName('JakeData');
    var RyanData = ss.getSheetByName('RyanData');
    var JaredData = ss.getSheetByName('JaredData');



    //Email Var List
    var eRandy = info.getRange(2, 2).getDisplayValue();
    var eJake = info.getRange(2, 4).getDisplayValue();
    var eJared = info.getRange(2, 6).getDisplayValue();

    //This is how to pull ALL charts from a sheet in a spreadsheet.
    var chartsJake = JakeData.getCharts();
    var AccountsReceivable = SpreadsheetApp.openById('##################').getSheetByName('HowMuch').getCharts();


    //This is how you use the HTML file for the template in the email.
    var template = HtmlService.createTemplateFromFile("eMailReport");
    template.date = Utilities.formatDate(new Date(), Session.getTimeZone(), "MM/dd/yyyy");

    //Use Google to look up how to figure out the ID for your file in Google Drive
    var ReportPDF = DriveApp.getFileById("###########3");

    //This is how you send the email in form of (Receipient, Subject, Body, attachments)
    MailApp.sendEmail(eJared + ", " + eJake + ", " + eRandy, "CRM Weekly Report", "",

        {
            attachments: [ReportPDF],
            htmlBody: template.evaluate().getContent(),

            //This line names the images to put in the HTML file and finds where they are in the sheet
            inlineImages: {
                chart00: AccountsReceivable[0].getBlob(),
                chart2: chartsJake[2].getBlob(),
            }
        }
    )

}