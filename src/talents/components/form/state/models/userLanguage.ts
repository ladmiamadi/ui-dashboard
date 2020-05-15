import { createModel } from '@rematch/core';
import { LanguageFactory } from '../../helpers/LanguageFactory';
//import { UserLanguage }  from '../../../../../app/index';
import { Toastify } from '../../../../../helpers/Toastify';
import { Language } from '../index';

export type LanguageState = {
  language: Language,
  isPosting: boolean
}

export interface UpdateLanguagePayload {
  property: string,
  value: string,
}

export const language = createModel({
  state: {
    language: LanguageFactory.createEmptyLanguage(),
    isPosting: false,
  } as LanguageState ,
  reducers: {
    setIsPosting: (state: LanguageState, payload: boolean): LanguageState => ({ ...state, isPosting: payload }),
    updateLanguage: (state: LanguageState, payload: UpdateLanguagePayload): LanguageState  => {
      console.log('tu rentre here?');
      const language = { ...state.language } as any;
      language[payload.property] = payload.value;
      console.log(language);
      return {
        ...state, language
      };
    },
    resetLanguage: (state) => ({ ...state, language: LanguageFactory.createEmptyLanguage() })
  },
  effects: {
    async postLanguage() {
      try {
        this.setIsPosting(true);

        await console.log('yes');

        (new Toastify()).info('Client added successfully.');
      } catch (error) {
        (new Toastify()).error(`Unable to added the client. ${ error.message }`);
      }
    }
  }
});
