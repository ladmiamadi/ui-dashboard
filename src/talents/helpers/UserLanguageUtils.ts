import { UserLanguage } from '../../app';
import { LANGUAGES } from '../constants/language';

export class UserLanguageUtils {
  public static filterLanguageList(userLanguages: UserLanguage[]): string[] {
    const userLanguageCollection = userLanguages.map(({ language }) => (language));

    return LANGUAGES.filter((language) => !userLanguageCollection.includes(language));
  }
}
