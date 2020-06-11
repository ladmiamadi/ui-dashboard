import { createModel } from '@rematch/core';
import { apiService } from '../../../../../../app/http/service';
import { UserLanguage } from '../../../../../../app/index';
import { UserLanguagesFactory } from '../../../helpers/UserLanguagesFactory';
import { Toastify } from '../../../../../../helpers/Toastify';

export interface State {
  languages: UserLanguage[],
  isFetching: boolean,
}

export const userLanguages = createModel({
  state: {
    languages: [],
    isFetching: false,
  } as State,
  reducers: {
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    initUserLanguages: (state: State, languages: UserLanguage[]): State => ({ ...state, languages }),
    addUserLanguages: (state: State, language: UserLanguage): State => {
      const languages = state.languages
        .map(language => ({ ...language }))
        .concat(language);

      return {
        ...state, languages,
      };
    },
    updateUserLanguages: (state: State, newLanguage: UserLanguage): State => {
      const languages = state.languages
        .map(language => ({ ...language }));
      const indexLanguage = languages
        .map(({ language }) => (language))
        .findIndex((toFind) => toFind === newLanguage.language);

      languages[indexLanguage] = newLanguage;

      return {
        ...state, languages,
      };
    },
  },
  effects: {
    async fetchLanguages() {
      this.setIsFetching(true);

      try {
        const { data } = await apiService.get('/api/users/1');

        this.initUserLanguages(UserLanguagesFactory.createLanguageFromUserData(data));
      } catch (error) {
        (new Toastify()).info(`Unable to fetch user languages. ${ error.message }`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
