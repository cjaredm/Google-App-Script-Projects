function EmployeeClockOut() {
    //Breakdown to the 
    const ss = SpreadsheetApp.getActive();
    const dataSheet = ss.getSheetByName('Form Responses 1');
    const info = ss.getSheetByName('EmployeeInfo');

    const employee = ss.getSheetByName('employee');

    //Email Var List
    const eJake = info.getRange(2, 4).getDisplayValue();
    const eJared = info.getRange(2, 6).getDisplayValue();
    const eemployee = info.getRange(2, 12).getDisplayValue();

    //SMS Var List
    const textemployee = info.getRange(3, 12).getValue();

    //vars for Clock IN (B columns) and Clock OUT (E columns)
    const employeeBvals = employee.getRange("B:B").getValues();
    const employeeEvals = employee.getRange("E:E").getValues();
    //Last filled cells so we know what is the current day to check.
    const employeeBlast = employeeBvals.filter(String).length;
    const employeeElast = employeeEvals.filter(String).length;
    //have they clocked in and then out for lunch.
    const employeecurrentEcell = employee.getRange("E" + employeeElast).getValue();
    const employeecurrentBcell = employee.getRange("B" + employeeBlast).getValue();

    //vars for Start Lunch (C column) and END lunch (D column)
    const employeeCvals = employee.getRange("C:C").getValues();
    const employeeDvals = employee.getRange("D:D").getValues();
    const employeeClast = employeeCvals.filter(String).length;
    const employeeDlast = employeeDvals.filter(String).length;
    const employeecurrentCcell = employee.getRange("C" + employeeClast).getValue();
    const employeecurrentDcell = employee.getRange("D" + employeeDlast).getValue();

    //if they clocked in at the beginning of the day, but didn't clock out at the end of the day then text them a reminder.
    if (employeecurrentBcell !== "-" && employeecurrentEcell == "-") { MailApp.sendEmail(textemployee, "", "Did you forget to clock out? Go to TimeCard: http://websiteForm (Automated message. Do Not Reply.)"); }

}