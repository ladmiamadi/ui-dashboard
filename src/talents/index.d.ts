export enum FormatDate {
  YEAR,
  MONTH,
  DAY,
}

export interface Payload {
  index: number,
  category: string,
  property: string,
  value: string,
}