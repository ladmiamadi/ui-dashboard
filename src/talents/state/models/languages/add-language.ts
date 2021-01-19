import { createModel } from '@rematch/core';
import { UserLanguage } from '../../../../app';
import { Toastify } from '../../../../helpers/Toastify';
import { UserLanguageFactory } from '../../../helpers/UserLanguageFactory';

export interface LanguageState {
  isPosting: boolean,
  language: UserLanguage,
}

export interface UpdateLanguagePayload {
  property: string,
  value: string,
}

export const addLanguage = createModel({
  state: {
    isPosting: false,
    language: UserLanguageFactory.createEmptyLanguage(),
  } as LanguageState,
  reducers: {
    updateLanguage: (state: LanguageState, payload: UpdateLanguagePayload): LanguageState => {
      const language = { ...state.language } as any;

      language[payload.property] = payload.value;

      return {
        ...state, language,
      };
    },
    resetLanguage: (state) => ({ ...state, language: UserLanguageFactory.createEmptyLanguage() }),
  },
  effects: (dispatch: any) => ({
    async addLanguageToSelectedUser(userLanguage: UserLanguage) {
      try {
        dispatch.userSelected.addUserLanguage(userLanguage);
        this.resetLanguage();
      } catch (error) {
        (new Toastify()).info(`Unable to add a new language. ${error.message}`);
      }
    },
  }),
});