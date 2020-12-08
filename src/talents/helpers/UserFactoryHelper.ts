import { UserSignUp } from '..';
import { Job, User, UserAddress, UserDesiredJob, UserJob, UserProfile, UserRecruitment } from '../../app';

export const createDtoUserIntern = (userSignUp: UserSignUp, jobCollection: Job[], recruiter: User): User => {

  const userProfileLive: UserProfile = {
    environment: 'live',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    email: userSignUp.username,
    status: 'VALIDATED',
    phone: userSignUp.phone,
    position: userSignUp.jobPosition,
    institution: userSignUp.institution,
    emailInstitution: userSignUp.emailInstitution,
    phoneInstitution: userSignUp.phoneInstitution,
    personContactInstitution: userSignUp.personContactInstitution,
  };

  const userProfileWorking: UserProfile = {
    environment: 'working',
    firstName: userSignUp.firstName,
    lastName: userSignUp.lastName,
    email: userSignUp.username,
    phone: userSignUp.phone,
    status: 'VALIDATED',
    position: userSignUp.jobPosition,
    institution: userSignUp.institution,
    emailInstitution: userSignUp.emailInstitution,
    phoneInstitution: userSignUp.phoneInstitution,
    personContactInstitution: userSignUp.personContactInstitution,
  };

  const userRecruitment: UserRecruitment = {
    platform: userSignUp.platform,
    mailboxHR: userSignUp.mailboxHR,
    recruitmentComments: userSignUp.recruitmentComments,
    recruiter: recruiter,
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
    userRecruitment,
  };
};
