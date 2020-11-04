import { UserSignUp } from '..';
import { Job, User, UserAddress, UserDesiredJob, UserJob, UserProfile } from '../../app';

export const createDtoUserIntern = (userSignUp: UserSignUp, jobCollection: Job[]): User => {
  const userAddress: UserAddress = {
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
    position: userSignUp.jobPosition,
    nationality: userSignUp.nationality,
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
    position: userSignUp.jobPosition,
    nationality: userSignUp.nationality,
  };

  const job: Job = jobCollection.filter((job: Job) => job.position === userSignUp.jobPosition)[0];
  const userJob: UserJob = {
    job: job,
  };

  const userDesiredJob: UserDesiredJob = {
    placementOptions: undefined,
  };

  return {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: userSignUp.username,
    userAddress: userAddress,
    userProfiles: [userProfile, userProfileWorking],
    userJob: userJob,
    userDesiredJob,
  };
};
