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
    recruitedByUser: undefined,
  },
  userAbsences: [],
  userInterviews: [],
  userContracts: [],
  userLanguages: [],
  userExperiences: [],
  userTrainings: [],
  userSkills: [],
});
