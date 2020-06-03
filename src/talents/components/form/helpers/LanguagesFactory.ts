import { Language } from '../state/index';
import { User } from '../../../../app';

export class LanguagesFactory {
  public static createLanguageFromUserData(data: User): Language[] {
    if (!data.userLanguages) {
      return [];
    }

    const languages = data.userLanguages?.map(
      ({ language, level }) => ({ language, level }) as Language
    );

    return languages;
  }
}