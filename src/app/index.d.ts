export interface Module {
  name: string,
  description: string,
  linkText: string,
  link: string,
}

export interface User {
  id: number | null,
  username: string,
  password: string,
  createdDate?: Date,
  updatedDate?: Date,
  userProfiles?: UserProfile[],
  userAddress?: UserAddress,
  userAbsences?: UserAbsence[],
  userInterviews?: UserInterview[],
  userContracts?: UserContract[],
  userLanguages?: UserLanguage[],
  userExperiences?: UserExperience[],
  userTrainings?: UserTraining[],
  userRole?: UserRole,
  userSkills?: UserSkill[],
  userJob?: UserJob,
}

export interface UserAddress {
  id: number,
  user: User,
  street: string,
  number: string,
  box: string
  zipCode: number,
  city: string,
  country : string
  status: string,
}

export interface UserProfile {
  id: number,
  user: User,
  lastName: string,
  firstName: string,
  phone: string,
  requestInFrench: string,
  requestInEnglish: string,
  requestInDutch: string,
  motivationInFrench : string,
  motivationInEnglish : string,
  motivationInDutch : string,
  mobility: string,
  birthDate: Date,
  institution: string,
  descriptionInFrench: string,
  descriptionInEnglish: string,
  descriptionInDutch: string,
  isActuallyLookingForJob: boolean,
  phoneInstitution: string,
  mailInstitution: string,
  personContactInstitution: string,
  desiredJob: string,
  actualSalary: number,
  expectedSalary: number,
  status: string,
  environment: string
  picture_path: string,
}

export interface UserAbsence {
  id: number,
  user: User,
  isAuthorized: boolean,
  isSick: boolean,
}

export interface UserInterview {
  id: number,
  user: User,
  date: Date,
}

export interface UserContract {
  id: number,
  user: User,
  status: string,
  type: string,
  createdDate: Date,
  updatedDate: Date,
}

export interface UserLanguage {
  language: string,
  level: string,
}

export interface UserExperience {
  id: number,
  user: User,
  company: string,
  startDate: Date,
  endDate: Date,
  position: string,
  task: string,
}

export interface UserTraining {
  id: number,
  user: User,
  institution: string,
  startDate: Date,
  endDate: Date,
  degreeObtained: string,
}

export interface UserRole {
  user: User,
  role: Role,
}

export interface UserSkill {
  user: User,
  skill: Skill,
  rating: number,
}

export interface UserJob {
  user: User,
  job: Job,
  startDate: Date,
  endDate: Date,
  isWorkingOnMonday: boolean,
  isWorkingOnTuesday: boolean,
  isWorkingOnWednesday: boolean,
  isWorkingOnThursday: boolean,
  isWorkingOnFriday: boolean,
  isWorkingOnSaturday: boolean,
  isWorkingOnSunday: boolean,
  status: string,
  workingHours: string,
}

export interface Role {
  id: number,
  name: string,
  userRoles: UserRole[],
}

export interface Skill {
  id: number,
  name: string,
  userSkills: UserSkill[],
}

export interface Job {
  id: number,
  titleInFrench: string,
  titleInEnglish: string,
  titleInDutch: string,
  shortDescriptionInFrench: string,
  shortDescriptionInEnglish: string,
  shortDescriptionInDutch: string,
  LongDescriptionInFrench: string,
  LongDescriptionInEnglish: string,
  LongDescriptionInDutch: string,
  position: string,
  link: string,
  picturePath: string,
  isOpen: boolean,
  createdDate: Date,
  updatedDate: Date,
  userJobs: UserJob[],
}
