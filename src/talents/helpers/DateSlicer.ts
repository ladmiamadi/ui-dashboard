import { FormatDate } from '../index';

export default class DateSlicer {
  public static formatDate = (value: string, selectTime: FormatDate) => {
    const formatDate = value.split('T')[0].split('-');

    return formatDate.map((elem: string) => `${ + elem }`)[selectTime];
  }
}
