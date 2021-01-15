import { INTERNSHIP_STATUS, User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: -1,
  username: '',
  password: '',
  isActive: true,
  isAdmin: false,
  createdDate: new Date(),
  updatedDate: new Date(),
  userProfiles: [],
  userRecruitment: {
    platform: '',
    mailboxHR: '',
    recruitmentComments: '',
    recruiter: undefined,
  },
  userAbsences: [],
  userInterviews: [],
  userContracts: [],
  userLanguages: [],
  userExperiences: [],
  userTrainings: [],
  userSkills: [],
});

export const getInternshipRemainingDays = (user: User): number => {
  const statusInternship = user.userJob?.status || INTERNSHIP_STATUS.NONE;
  const today = new Date();
  const endDate = user.userJob?.endDate;
  let dateDiffInMs = -1;

  if (!endDate || (statusInternship !== INTERNSHIP_STATUS.ONGOING)) {
    return dateDiffInMs;
  }

  dateDiffInMs = endDate.getTime() - today.getTime();

  return Math.round(dateDiffInMs / (1000 * 60 * 60 * 24));
};

export const isUserInternshipFinishing = (remainingDays: number): boolean => {
  return remainingDays >= 0 && remainingDays <= 14;
};

export const getUserByUsername = (users: User[], username: string): User | null => {
  return users.find(user => user.username === username) || null;
};
