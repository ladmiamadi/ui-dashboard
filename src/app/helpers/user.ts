import { INTERNSHIP_STATUS, User } from '../index.d';

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

export const isUserInternshipFinishing =
  (
    user: User,
  ): {
    nDiffDays?: number,
    isInternshipFinishing: boolean,
  } => {
    const statusInternship = user.userJob?.status || INTERNSHIP_STATUS.NONE;

    const today = new Date();

    const endDate = user.userJob?.endDate;

    let nDiffDays: number | undefined = undefined;
    let isInternshipFinishing: boolean = false;

    if (!endDate || (statusInternship !== INTERNSHIP_STATUS.ONGOING)) {
      isInternshipFinishing = false;
    } else {
      const dateDiffInMs = endDate.getTime() - today.getTime();

      nDiffDays = Math.round(dateDiffInMs / (1000 * 60 * 60 * 24));
      isInternshipFinishing = nDiffDays <= 14;
    }

    return { nDiffDays, isInternshipFinishing };
  };
