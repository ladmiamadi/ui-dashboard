import { UserLanguage } from '../../../../app/index';
import { User } from '../../../../app';

export class LanguagesFactory {
  public static createLanguageFromUserData(data: User): UserLanguage[] {
    if (!data.userLanguages) {
      return [];
    }

    return data.userLanguages?.map(
        ({ language, level }) => ({ language, level }) as UserLanguage
    );
  }
}