import { User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: -1,
  username: '',
  password: '',
  isActive: true,
  createdDate: new Date(),
  updatedDate: new Date(),
  userProfiles: [],
  userAbsences: [],
  userInterviews: [],
  userContracts: [],
  userLanguages: [],
  userExperiences: [],
  userTrainings: [],
  userSkills: [],
});
