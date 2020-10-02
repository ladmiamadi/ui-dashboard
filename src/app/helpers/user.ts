import { User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: null,
  username: '',
  password: '',
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
