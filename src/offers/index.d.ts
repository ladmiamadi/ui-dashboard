import { InputType } from 'reactstrap/lib/Input';


interface Field {
  id: keyof UserRegister<T>,
  label: string,
  regEx: string,
  type: InputType,
  required?: true,
  isSectionTitle?: boolean,
}

export interface UserSignUpPayload {
  property: keyof UserRegister<T>,
  value: string,
}



export interface PropsForInput {
  id: keyof UserRegister<T>,
  idValue: string,
  isInputValid: InputState,
  options?: string[],
  optionsMenu?: string,
  label: string,
  usernameCollection?: string[],
  type: InputType,
  regEx: string,
  required?: boolean,
  isSectionTitle?: boolean,
  updateUserSignUp: (property: keyof UserRegister<T>, idValue: string) => void,
  setIsFormValid: (property: keyof UserRegister<T>, regEx: string) => void,
}
//////////////////////////////////////////////////////////

// PARTIE OFFERS//


export enum FormatDate {
  YEAR,
  MONTH,
  DAY,
}

export enum InputState {
  TRUE = true,
  FALSE = false,
  UNDEFINED = undefined,
}

export interface OfferRegister<T> {
  titleInFrench: T,
  titleInEnglish: T,
  titleInDutch: T,
  shortDescriptionInFrench: T,
  shortDescriptionInEnglish: T,
  shortDescriptionInDutch: T,
  longDescriptionInFrench: T,
  longDescriptionInEnglish: T,
  longDescriptionInDutch: T,
  position: T,
  linkEnglish: T,
  linkFrench: T,
  picture: T,
}

export type CreateOffer = OfferRegister<string>;


export interface IsFormValid {
  titleInFrench: string,
  titleInEnglish: string,
  shortDescriptionInFrench: string,
  shortDescriptionInEnglish: string,
  longDescriptionInFrench: string,
  longDescriptionInEnglish: string,
  position: string,
  linkEnglish: string,
  linkFrench: string,
  picture: string,
}