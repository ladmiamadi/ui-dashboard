import { createModel } from '@rematch/core';
import { UserLanguageFactory } from '../../../helpers/UserLanguageFactory';
import { Toastify } from '../../../../helpers/Toastify';
import { UserLanguage } from '../../../../app';
import { apiService } from '../../../../app/http/service';

export interface LanguageState {
  language: UserLanguage,
  isPosting: boolean,
}

export interface UpdateLanguagePayload {
  property: string,
  value: string,
}

export const addLanguage = createModel({
  state: {
    language: UserLanguageFactory.createEmptyLanguage(),
    isPosting: false,
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
    resetLanguage: (state: LanguageState) => ({ ...state, language: UserLanguageFactory.createEmptyLanguage() }),
  },
  effects: (dispatch: any) => ({
    async postLanguage(userLanguage : UserLanguage, user) {
      try {
        this.setIsPosting(true);
        console.log(user.userSelected.userSelected.id);
        await apiService.post('/api/user_languages', {
          user: `api/users/${user.userSelected.userSelected.id}`,
          language: userLanguage.language,
          level: userLanguage.level,
        });

        dispatch.userSelected.addUserLanguage(userLanguage);
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
