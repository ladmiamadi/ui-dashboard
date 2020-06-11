export const arrayOptionsPosition = ['Dev', 'SEO', 'Commercial', 'RH', 'Graphiste'];

export interface PropsForInput {
  id: string,
  idValue: string,
  isInputValid: boolean | undefined,
  type: any,
  label: string,
  regEx: string,
  listUserUsername?: string[],
  updateUserSignUp: (id: string, value: string) => void,
  setIsFormValid: (id: string, payload: boolean) => void,
}