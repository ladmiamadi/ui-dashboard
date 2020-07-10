import { FormatDate } from '../index';

export default class DateSlicer {
  public static formatDate = (value: string, selectTime: FormatDate) => {
    const formatDate = value.split('T')[0].split('-');

    return formatDate.map((elem: string) => `${ + elem }`)[selectTime];
  }

  public static getYearMonthDay = (dateFormatted: string): string => {
    let yearMonthDayFormat = '';

    if (dateFormatted) {
      const date = new Date(dateFormatted);

      yearMonthDayFormat = [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
      ].join('-');
    }

    return yearMonthDayFormat;
  }
}

