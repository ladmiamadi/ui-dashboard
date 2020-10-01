import { UserLanguage } from '../../app';

export class UserLanguageFactory {
  public static createEmptyLanguage(): UserLanguage {
    return {
      language: 'Aucun',
      level: 'Aucun',
    };
  }
}
