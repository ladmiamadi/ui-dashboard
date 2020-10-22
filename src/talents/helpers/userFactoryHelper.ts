import { UserSignUp } from '..';
import { Job, User, UserAddress, UserJob, UserProfile } from '../../app';

export const createDtoUserIntern = (userSignUp: UserSignUp, jobCollection: Job[]): User => {
  const userAddress: UserAddress = {
    country: userSignUp.country,
  };

  const userProfile: UserProfile = {
    birthDate: new Date(userSignUp.birthDate),
    environment: 'live',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    platform: userSignUp.platform,
    email: userSignUp.username,
    phone: userSignUp.phone,
    status: 'VALIDATED',
  };

  const userProfileWorking: UserProfile = {
    birthDate: new Date(userSignUp.birthDate),
    environment: 'working',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    platform: userSignUp.platform,
    email: userSignUp.username,
    phone: userSignUp.phone,
    status: 'VALIDATED',
  };

  const job: Job = jobCollection.filter((job: Job) => job.position === userSignUp.jobPosition)[0];
  const userJob: UserJob = {
    job: job,
  };

  return {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: userSignUp.username,
    userAddress: userAddress,
    userProfiles: [userProfile, userProfileWorking],
    userJob: userJob,
  };
};
