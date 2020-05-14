import { Profiler } from 'inspector';
import Profile = module

export interface User {
  id: number,
  user_id: number,
  username: string,
  userProfiles: profile[],
  userAddress: Address,
  userLanguages : language,
}

export interface Address {
  city: string,
  country : string
  status: string,
}

export interface profile {
  lastName: string,
  firstName: string,
  status: string,
  environment: string
  picture_path: string,
}
