import { UserLanguage } from '../../../../app/index';

export class UserLanguageFactory {
  public static createEmptyLanguage(): UserLanguage {
    return {
      language: 'Aucun',
      level: 'Aucun',
    };
  }
}
