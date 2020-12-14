import {
  INTERNSHIP_STATUS,
  Job,
  MediaObject,
  Role,
  User,
  UserAddress,
  UserDesiredJob,
  UserJob,
  UserRole,
} from '../../app';

export class UserFactory {
  public createDTOUser = (user: User): User => ({
    id: user.id,
    username: user.username,
    password: user.password,
    isActive: user.isActive,
    createdDate: user.createdDate,
    updatedDate: user.updatedDate,
    userProfiles: user.userProfiles,
    userAddress: user.userAddress,
    userDesiredJob: user.userDesiredJob,
    userRecruitment: user.userRecruitment,
    userAbsences: user.userAbsences,
    userInterviews: user.userInterviews,
    userContracts: user.userContracts,
    userLanguages: user.userLanguages,
    userExperiences: user.userExperiences,
    userTrainings: user.userTrainings,
    userRole: user.userRole,
    userSkills: user.userSkills,
    userJob: user.userJob,
  });

  static createEmptyUser = (): User => {
    const dtoUser: User = {
      id: 0,
      username: '',
      password: '',
      isActive: false,
      createdDate: new Date(),
      userRecruitment: {
        platform: '',
        mailboxHR: '',
        recruitmentComments: '',
      },
    };

    return dtoUser;
  }

  public createEmptyUserDesiredJob = (): UserDesiredJob => ({
    id: 0,
    desiredJob: '',
    mobility: '',
    desiredCountry: '',
    desiredCity: '',
    currentSalary: 0,
    desiredSalary: 0,
    jobDescription: '',
    internOptions: '',
    placementOptions: '',
  })

  public createEmptyUserAddress = (): UserAddress => ({
    id: 0,
    street: '',
    number: '',
    box: '',
    zipCode: 0,
    city: '',
    country: '',
  })

  public createEmptyUserRole = (): UserRole => ({
    role: this.createEmptyRole(),
  })

  public createEmptyRole = (): Role => ({
    id: 0,
    name: '',
  })

  public createEmptyUserJob = (): UserJob => ({
    job: this.createEmptyJob(),
    startDate: new Date(),
    endDate: new Date(),
    isWorkingOnMonday: false,
    isWorkingOnTuesday: false,
    isWorkingOnWednesday: false,
    isWorkingOnThursday: false,
    isWorkingOnFriday: false,
    isWorkingOnSaturday: false,
    isWorkingOnSunday: false,
    status: INTERNSHIP_STATUS.NONE,
    workingHours: '',
    startInterview: '',
    middleInterview: '',
    endInterview: '',
  })

  public createEmptyJob = (): Job => ({
    id: 0,
    titleInFrench: '',
    titleInEnglish: '',
    titleInDutch: '',
    shortDescriptionInFrench: '',
    shortDescriptionInEnglish: '',
    shortDescriptionInDutch: '',
    longDescriptionInFrench: '',
    longDescriptionInEnglish: '',
    longDescriptionInDutch: '',
    position: '',
    linkFrench: '',
    linkEnglish: '',
    picture: this.createEmptyMediaObject(),
    isOpen: false,
    createdDate: new Date(),
    updatedDate: new Date(),
  })

  public createEmptyMediaObject = (): MediaObject => ({
    filePath: '',
  })
}
