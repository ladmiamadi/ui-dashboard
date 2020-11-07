import { UserProfile } from '../../app';
import { env } from '../../helpers/environment';

const DEFAULT_AVATAR_IMG = '/default_avatar.png';

export const calculateUserProfileUrlPicture = (userProfile?: UserProfile): string => {
  return env('MEDIA_URL')
    + (userProfile && userProfile.picture
      ? `${userProfile.picture.filePath}`
      : DEFAULT_AVATAR_IMG);
};
