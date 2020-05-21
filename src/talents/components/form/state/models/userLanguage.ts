import { createModel } from '@rematch/core';
import { apiService } from '../../../../../app/http/service';
import { LanguageFactory } from '../../helpers/LanguageFactory';
//import { UserLanguage }  from '../../../../../app/index';
//import { Toastify } from '../../../../../helpers/Toastify';
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
      const language = { ...state.language } as any;
      language[payload.property] = payload.value;
      return {
        ...state, language
      };
    },
    resetLanguage: (state) => ({ ...state, language: LanguageFactory.createEmptyLanguage() })
  },
  effects: {
    async fetchLanguage():Promise<void> {
      console.log('je suis ici');
      try {
        this.setIsPosting(true);
        const { data } = await apiService.get('/api/users/1');
        console.log(data);
      } catch  {
        console.log('ne fonctionne pas ');
      }finally {
        this.setIsPosting(false);
      }
    }
  }
});
