export interface Module {
  name: string,
  description: string,
  linkText: string,
  link: string,
}

export interface User {
  username: string,
  password: string,
  isActive: boolean,
  createdDate: Date,
  id?: number | null,
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
  country: string,
  id?: number,
  user?: User,
  street?: string,
  number?: string,
  box?: string
  zipCode?: number,
  city?: string,
  status?: string,
}

export interface UserProfile {
  environment: string
  firstName: string,
  lastName: string,
  phone: string,
  mailInstitution?: string,
  birthDate: Date,
  desiredJob?: string,
  id?: number,
  user?: User,
  requestInFrench?: string,
  requestInEnglish?: string,
  requestInDutch?: string,
  motivationInFrench?: string,
  motivationInEnglish?: string,
  motivationInDutch?: string,
  mobility?: string,
  institution?: string,
  descriptionInFrench?: string,
  descriptionInEnglish?: string,
  descriptionInDutch?: string,
  isActuallyLookingForJob?: boolean,
  phoneInstitution?: string,
  personContactInstitution?: string,
  actualSalary?: number,
  expectedSalary?: number,
  status?: string,
  picture?: MediaObject,
}

export interface MediaObject {
  filePath: string,
  desiredJob?: string,
  id?: number,
  user?: User,
  requestInFrench?: string,
  requestInEnglish?: string,
  requestInDutch?: string,
  motivationInFrench?: string,
  motivationInEnglish?: string,
  motivationInDutch?: string,
  mobility?: string,
  institution?: string,
  descriptionInFrench?: string,
  descriptionInEnglish?: string,
  descriptionInDutch?: string,
  isActuallyLookingForJob?: boolean,
  phoneInstitution?: string,
  personContactInstitution?: string,
  actualSalary?: number,
  expectedSalary?: number,
  status?: string,
  picture?: MediaObject,
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
  id: number,
  language: string,
  level: string,
}

export interface UserExperience {
  id: number,
  company: string,
  startDate: Date,
  endDate: Date,
  position: string,
  task: string,
}

export interface UserTraining {
  id: number,
  institution: string,
  startDate: Date,
  endDate: Date,
  degreeObtained: string,
}

export interface UserRole {
  role: Role,
}

export interface UserSkill {
  skill: Skill,
  rating: number,
}

export interface UserJob {
  user?: User,
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

export interface MediaObject {
  filePath: string,
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