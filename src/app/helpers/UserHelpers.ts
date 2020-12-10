import { User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: -1,
  username: '',
  password: '',
  isActive: true,
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

export const getUserByUsername = (users: User[], username: string): User | null => {
  return users.find(user => user.username === username) || null;
};
