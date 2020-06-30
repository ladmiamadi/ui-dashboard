import { User, UserAddress, UserProfile, UserJob, Job } from '../../app';
import { UserSignUp } from '..';

export const createDtoUserIntern = (userSignUp: UserSignUp, jobCollection: Job[]): User => {
  const userAddress: UserAddress = {
    country: userSignUp.country,
  };

  const userProfile: UserProfile = {
    birthDate: new Date(userSignUp.birthDate),
    environment: 'live',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    phone: userSignUp.phone,
  };

  const job: Job = jobCollection.filter((job: Job) => job.position === userSignUp.jobPosition)[0];
  const userJob: UserJob = {
    job: job,
  };

  const user: User = {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: userSignUp.username,
    userAddress: userAddress,
    userProfiles: [userProfile],
    userJob: userJob,
  };

  return user;
};