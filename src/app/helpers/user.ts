import { User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: null,
  username: '',
  password: '',
  createdDate: new Date(),
  updatedDate: new Date(),
  userProfiles: [],
  userAddress: null,
  userAbsences: [],
  userInterviews: [],
  userContracts: [],
  userLanguages: [],
  userExperiences: [],
  userTrainings: [],
  userRole: null,
  userSkills: [],
  userJob: null,
});
