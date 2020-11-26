export class ConstantsVariables{

  public static getMonthsArray(){
    return [
      {value: 0, viewValue: 'January'},
      {value: 1, viewValue: 'February'},
      {value: 2, viewValue: 'March'},
      {value: 3, viewValue: 'April'},
      {value: 4, viewValue: 'May'},
      {value: 5, viewValue: 'June'},
      {value: 6, viewValue: 'July'},
      {value: 7, viewValue: 'August'},
      {value: 8, viewValue: 'September'},
      {value: 9, viewValue: 'October'},
      {value: 10, viewValue: 'November'},
      {value: 11, viewValue: 'December'},
    ];
  }

  public static getYearsArray(){
    // we show 2 years for now, current and previous.
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return [
      {value: currentYear, viewValue: currentYear.toString()},
      {value: currentYear - 1, viewValue: (currentYear - 1).toString()},
    ];
  }


}
