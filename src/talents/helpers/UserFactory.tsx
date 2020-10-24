import { User } from '../../app';

export class UserFactory {
  public createDTOUser = (user: User) => ({
    id: user.id,
    username: user.username,
    password: user.password,
    createdDate: user.createdDate,
    updatedDate: user.updatedDate,
    userProfiles: user.userProfiles,
    userAddress: user.userAddress,
    userAbsences: user.userAbsences,
    userInterviews: user.userInterviews,
    userContracts: user.userContracts,
    userLanguages: user.userLanguages,
    userExperiences: user.userExperiences,
    userTrainings: user.userTrainings,
    userRole: user.userRole,
    userSkills: user.userSkills,
    userJob: user.userJob,
  })

  static createEmptyUser = () => {
    const dtoUser: User = {
      id: 0,
      username: '',
      password: '',
      isActive: false,
      createdDate: new Date(),
    };

    return dtoUser;
  }

  public createEmptyUserAddress = () => ({
    id: 0,
    street: '',
    number: '',
    box: '',
    zipCode: 0,
    city: '',
    country: '',
    status: '',
    internOptions: '',
  })

  public createEmptyUserRole = (dtoUser: User) => ({
    user: dtoUser,
    role: this.createEmptyRole(),
  })

  public createEmptyRole = () => ({
    id: 0,
    name: '',
    userRoles: [],
  })

  public createEmptyUserJob = () => ({
    job: this.createEmptyJob,
    startDate: new Date(),
    endDate: new Date(),
    isWorkingOnMonday: false,
    isWorkingOnTuesday: false,
    isWorkingOnWednesday: false,
    isWorkingOnThursday: false,
    isWorkingOnFriday: false,
    isWorkingOnSaturday: false,
    isWorkingOnSunday: false,
    status: '',
    workingHours: '',
  })

  public createEmptyJob = () => ({
    id: 0,
    titleInFrench: '',
    titleInEnglish: '',
    titleInDutch: '',
    shortDescriptionInFrench: '',
    shortDescriptionInEnglish: '',
    shortDescriptionInDutch: '',
    LongDescriptionInFrench: '',
    LongDescriptionInEnglish: '',
    LongDescriptionInDutch: '',
    position: '',
    link: '',
    picture: this.createEmptyMediaObject,
    isOpen: false,
    createdDate: new Date(),
    updatedDate: new Date(),
    userJobs: [],
  })

  public createEmptyMediaObject = () => ({
    filePath: '',
  })
}
