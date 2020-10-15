import { UserLanguage } from '../../app';

export class UserLanguageFactory {
  public static createEmptyLanguage(): UserLanguage {
    return {
      id: 0,
      language: 'Aucun',
      level: 'Aucun',
    };
  }
}
