import { UserLanguage } from '../../../../app/index';

export class LanguageFactory {
  public static createEmptyLanguage(): UserLanguage {
    return {
      language: '',
      level: '',
    };
  }
}
