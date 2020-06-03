import { createModel } from '@rematch/core';
import { apiService } from '../../../../../../app/http/service';
//import { UserLanguage }  from '../../../../../app/index';
//import { Toastify } from '../../../../../helpers/Toastify';
import { Language } from '../../index';
import { LanguagesFactory } from '../../../helpers/LanguagesFactory';
import { Toastify } from '../../../../../../helpers/Toastify';

export interface State {
    languages: Language[],
}

export const userLanguages = createModel({
  state: {
    languages: [],
  } as State,
  reducers: {
    initUserLanguage: (state: State, languages: Language[]): State => ({ ...state, languages }),
    addUserLanguage: (state: State, language: Language): State => {
      const languages = { ...state.languages } as Language[];

      languages.push(language);

      return {
        ...state, languages,
      };
    },
  },
  effects: {
    async fetchLanguages():Promise<void> {
      try {
        const { data } = await apiService.get('/api/users/1');

        this.initUserLanguage(LanguagesFactory.createLanguageFromUserData(data));
      } catch(error) {
        (new Toastify()).info(`Unable to fetch user languages. ${error.message}`);
      }
    },
  },
});
