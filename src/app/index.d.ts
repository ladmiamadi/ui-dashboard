export interface Module {
  name: string,
  description: string,
  linkText: string,
  link: string,
}

export interface User {
  id?: number,
  username: string,
  password: string,
  isActive: boolean,
  createdDate: Date,
  updatedDate?: Date,
  userProfiles?: UserProfile[],
  userAddress?: UserAddress,
  userDesiredJob?: UserDesiredJob,
  userRecruitment: UserRecruitment,
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
  id?: number,
  street?: string,
  number?: string,
  box?: string
  zipCode?: number,
  city?: string,
  country?: string,
}

export interface UserDesiredJob {
  id?: number,
  desiredJob?: string,
  mobility?: string,
  desiredCountry?: string,
  desiredCity?: string,
  currentSalary?: number,
  desiredSalary?: number,
  jobDescription?: string,
  internOptions?: string,
  placementOptions: string,
}

export interface UserRecruitment {
  id?: number,
  platform: string,
  recruiter?: User,
  mailboxHR: string,
  recruitmentComments: string,
}

export interface UserProfile {
  id?: number,
  lastName: string,
  firstName: string,
  email: string,
  phone?: string,
  requestInFrench?: string,
  requestInEnglish?: string,
  requestInDutch?: string,
  motivationInFrench?: string,
  motivationInEnglish?: string,
  motivationInDutch?: string,
  institutionSection?: string,
  institution?: string,
  descriptionInFrench?: string,
  descriptionInEnglish?: string,
  descriptionInDutch?: string,
  isActuallyLookingForJob?: boolean,
  phoneInstitution?: string,
  emailInstitution?: string,
  personContactInstitution?: string,
  status: string,
  environment: string
  picture?: MediaObject,
  position?: string,
}

export interface MediaObject {
  filePath: string,
}

export interface UserAbsence {
  id: number,
  isAuthorized: boolean,
  isSick: boolean,
}

export interface UserInterview {
  id: number,
  date: Date,
}

export interface UserContract {
  id: number,
  status: string,
  type: string,
  createdDate: Date,
  updatedDate: Date,
}

export interface UserLanguage {
  id?: number,
  language: string,
  level: string,
}

export interface UserExperience {
  id?: number,
  company: string,
  startDate: Date | null,
  endDate: Date | null,
  position: string,
  task: string,
}

export interface Training<T, U, D = T> {
  id?: U,
  institution: T,
  startDate: D,
  endDate: D,
  degreeObtained: T,
}

type UserTraining = Training<string, number, Date | null>;

export interface UserRole {
  role?: Role | null,
}

export interface UserSkill {
  skill: Skill,
  rating: number,
}

export interface UserJob {
  job: Job,
  startDate?: Date,
  endDate?: Date,
  isWorkingOnMonday?: boolean,
  isWorkingOnTuesday?: boolean,
  isWorkingOnWednesday?: boolean,
  isWorkingOnThursday?: boolean,
  isWorkingOnFriday?: boolean,
  isWorkingOnSaturday?: boolean,
  isWorkingOnSunday?: boolean,
  status?: string,
  workingHours?: string,
  startInterview?: string,
  middleInterview?: string,
  endInterview?: string,
}

export interface Role {
  id: number,
  name: string,
}

export interface Skill {
  id: number,
  name: string,
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
  picture: MediaObject,
  isOpen: boolean,
  createdDate: Date,
  updatedDate: Date,
}

export interface YearSegment {
  yearStart: number,
  yearEnd: number,
}

export interface UtilsDate {
  day: number,
  month: number,
  year: number,
}

export interface Checkbox {
  label: string,
  checked: boolean,
}

export interface OptionValue {
  value: string,
  label: string,
}