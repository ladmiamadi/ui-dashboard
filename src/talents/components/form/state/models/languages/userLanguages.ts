import { createModel } from '@rematch/core';
import { apiService } from '../../../../../../app/http/service';
import { UserLanguage } from '../../../../../../app/index';
import { LanguagesFactory } from '../../../helpers/LanguagesFactory';
import { Toastify } from '../../../../../../helpers/Toastify';

export interface State {
    languages: UserLanguage[],
}

export const userLanguages = createModel({
  state: {
    languages: [],
  } as State,
  reducers: {
    initUserLanguage: (state: State, languages: UserLanguage[]): State => ({ ...state, languages }),
    addUserLanguage: (state: State, language: UserLanguage): State => {
      const languages = state.languages
        .map(language => ({ ...language }))
        .concat(language);

      return {
        ...state, languages,
      };
    },
  },
  effects: {
    async fetchLanguages() {
      try {
        const { data } = await apiService.get('/api/users/1');

        this.initUserLanguage(LanguagesFactory.createLanguageFromUserData(data));
      } catch(error) {
        (new Toastify()).info(`Unable to fetch user languages. ${error.message}`);
      }
    },
  },
});
