import { OptionValue } from '../../app/components/utils/OptionList';

export const mapToOptionValue =
  (value: string): OptionValue => ({ label: value, value });

export const mapToOptionValues = (values: string[]): OptionValue[] => {
  if (!values) {
    return [];
  }

  return values.map(mapToOptionValue);
};
