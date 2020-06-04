import { createModel } from '@rematch/core';
import { LanguageFactory } from '../../../helpers/LanguageFactory';
import { Toastify } from '../../../../../../helpers/Toastify';
import { Language } from '../../index';
import { apiService } from '../../../../../../app/http/service';

export type LanguageState = {
  language: Language,
  isPosting: boolean
}

export interface UpdateLanguagePayload {
  property: string,
  value: string,
}

export const addLanguage = createModel({
  state: {
    language: LanguageFactory.createEmptyLanguage(),
    isPosting: false,
  } as LanguageState,
  reducers: {
    setIsPosting: (state: LanguageState, payload: boolean): LanguageState => ({ ...state, isPosting: payload }),
    updateLanguage: (state: LanguageState, payload: UpdateLanguagePayload): LanguageState  => {
      const language = { ...state.language } as any;
      language[payload.property] = payload.value;
      return {
        ...state, language,
      };
    },
    resetLanguage: (state) => ({ ...state, language: LanguageFactory.createEmptyLanguage() }),
    initUserLanguage: (state: LanguageState, language: Language): LanguageState => ({ ...state, language }),
  },
  effects: (dispatch: any) => ({
    async postLanguage(userLanguage : Language): Promise<void> {
      try {
        this.setIsPosting(true);
        await apiService.post('/api/users/1');

        dispatch.userLanguages.addUserLanguage(userLanguage);
        this.resetLanguage();

        (new Toastify()).info('Language added successfully.');
      } catch(error) {
        (new Toastify()).info(`Unable to add a new language. ${error.message}`);
      } finally {
        this.setIsPosting(false);
      }
    },
  }),
});
