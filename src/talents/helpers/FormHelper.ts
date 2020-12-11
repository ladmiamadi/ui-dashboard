import { OptionValue } from '../../app';

export const mapToOptionValue =
  (value: string): OptionValue => ({ label: value, value });

export const mapToOptionValues = (values: string[]): OptionValue[] => {
  if (!values) {
    return [];
  }

  return values.map(mapToOptionValue);
};