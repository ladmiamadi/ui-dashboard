import { UserSignUp } from '..';
import { Job, User, UserAddress, UserDesiredJob, UserJob, UserProfile } from '../../app';

export const createDtoUserIntern = (userSignUp: UserSignUp, jobCollection: Job[]): User => {

  const userProfileLive: UserProfile = {
    environment: 'live',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    platform: userSignUp.platform,
    email: userSignUp.username,
    phone: userSignUp.phone,
    status: 'VALIDATED',
    position: userSignUp.jobPosition,
    recruitmentTray: userSignUp.recruitmentTray,
    recruitmentComments: userSignUp.recruitmentComments,
    institution: userSignUp.institution,
    emailInstitution: userSignUp.emailInstitution,
    phoneInstitution: userSignUp.phoneInstitution,
    personContactInstitution: userSignUp.personContactInstitution,
  };

  const userProfileWorking: UserProfile = {
    environment: 'working',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    platform: userSignUp.platform,
    email: userSignUp.username,
    phone: userSignUp.phone,
    status: 'VALIDATED',
    position: userSignUp.jobPosition,
    recruitmentTray: userSignUp.recruitmentTray,
    recruitmentComments: userSignUp.recruitmentComments,
    institution: userSignUp.institution,
    emailInstitution: userSignUp.emailInstitution,
    phoneInstitution: userSignUp.phoneInstitution,
    personContactInstitution: userSignUp.personContactInstitution,
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

  const userAddress: UserAddress = {
    street: '',
    number: '',
    zipCode: 0,
    city: '',
    box: '',
    country: '',
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
