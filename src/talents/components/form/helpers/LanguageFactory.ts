//import { UserLanguage } from '../../../../app/index';
import { Language } from '../state/index';

export class LanguageFactory {
  public static createEmptyLanguage(): Language {
    return {
      language:'',
      level: ''
    };
  }

}
