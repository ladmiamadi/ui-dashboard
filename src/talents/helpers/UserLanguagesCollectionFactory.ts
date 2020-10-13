import { UserLanguage } from '../../app';
import { User } from '../../app';

export class UserLanguagesCollectionFactory {
    public static createCollectionFromUser(user: User): UserLanguage[] {
        if (!user.userLanguages) {
            return [];
        }

        return user.userLanguages;
    }
}