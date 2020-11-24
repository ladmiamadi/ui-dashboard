import { UserSignUp } from '..';
import { Job, User, UserAddress, UserDesiredJob, UserJob, UserProfile } from '../../app';

export const createDtoUserIntern = (userSignUp: UserSignUp, jobCollection: Job[]): User => {
  const userAddress: UserAddress = {
  };

  const userProfileLive: UserProfile = {
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
    startDate: new Date(),
    endDate: new Date(),
    isWorkingOnMonday: false,
    isWorkingOnTuesday: false,
    isWorkingOnWednesday: false,
    isWorkingOnThursday: false,
    isWorkingOnFriday: false,
    isWorkingOnSaturday: false,
    isWorkingOnSunday: false,
    status: 'Aucun',
    workingHours: '',
  };

  const userDesiredJob: UserDesiredJob = {
    desiredJob: '',
    mobility: '',
    desiredCountry: '',
    desiredCity: '',
    currentSalary: 0,
    desiredSalary: 0,
    jobDescription: '',
    internOptions: '',
    placementOptions: '',
  };

  return {
    createdDate: new Date(),
    isActive: true,
    password: 'sosecure',
    username: userSignUp.username,
    userAddress: userAddress,
    userProfiles: [userProfileLive, userProfileWorking],
    userJob: userJob,
    userDesiredJob,
  };
};
