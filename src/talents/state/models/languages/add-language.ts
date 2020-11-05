import { apiService } from '../../../../app/http/service';
import { createModel } from '@rematch/core';
import { Toastify } from '../../../../helpers/Toastify';
import { UserLanguage } from '../../../../app';
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
    setIsPosting: (state: LanguageState, isPosting): LanguageState => ({ ...state, isPosting }),
    updateLanguage: (state: LanguageState, payload: UpdateLanguagePayload): LanguageState  => {
      const language = { ...state.language } as any;
      language[payload.property] = payload.value;

      return {
        ...state, language,
      };
    },
    resetLanguage: (state) => ({ ...state, language: UserLanguageFactory.createEmptyLanguage() }),
  },
  effects: (dispatch: any) => ({
    async postLanguage({ userLanguage, userId } : { userLanguage: UserLanguage, userId: number | undefined }) {
      try {
        this.setIsPosting(true);

        await apiService.post('/api/user_languages', {
          user: `/api/users/${userId}`,
          language: userLanguage.language,
          level: userLanguage.level,
        });

        dispatch.userLanguages.addUserLanguages(userLanguage);
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