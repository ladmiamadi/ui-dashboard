import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { createEmptyUserSignUp, createEmptyIsFormValid } from '../../helpers/userSignUpFactoryHelper';
import { UserSignUpPayload, FormValidPayload, UserSignUp, IsFormValid } from '../..';
import { Toastify } from '../../../helpers/Toastify';
import { User, Job } from '../../../app/index.d';

export interface UserSignUpState {
  isFormValid: IsFormValid,
  isJobsFetching: boolean,
  isRequesting: boolean,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
}

export const userSignUp = createModel({
  state: {
    isFormValid: createEmptyIsFormValid(),
    isJobsFetching: false,
    isRequesting: false,
    jobCollection: [],
    usernameCollection: [],
    userSignUp: createEmptyUserSignUp(),
  } as UserSignUpState,
  reducers: {
    resetUserSignUp: (state: UserSignUpState): UserSignUpState => ({ 
      ...state, 
      isFormValid: createEmptyIsFormValid(), 
      userSignUp: createEmptyUserSignUp(), 
    }),
    setIsFormValid: (state: UserSignUpState, payload: FormValidPayload): UserSignUpState => { 
      const newIsFormValid = {
        ...state.isFormValid,
      } as any;
  
      newIsFormValid[payload.property] = payload.isInputValid;

      return ({
        ...state, 
        isFormValid: newIsFormValid,
      });
    },
    setIsJobsFetching: (state: UserSignUpState, isJobsFetching: boolean): UserSignUpState => ({
      ...state, 
      isJobsFetching, 
    }),
    setIsRequesting: (state: UserSignUpState, isRequesting: boolean): UserSignUpState => ({
      ...state, 
      isRequesting, 
    }),
    updateUserSignUp: (state: UserSignUpState, payload: UserSignUpPayload): UserSignUpState => { 
      const newUserSignUp = {
        ...state.userSignUp,
      } as any;
  
      newUserSignUp[payload.property] = payload.value;

      return ({
        ...state, 
        userSignUp: newUserSignUp, 
      });
    },
    updateUsernameCollection: (state: UserSignUpState, usernameCollection: string[]) => ({ 
      ...state, 
      usernameCollection, 
    }),
    updateJobCollection: (state: UserSignUpState, jobCollection: Job[]) => ({ 
      ...state, 
      jobCollection, 
    }),
  },
  effects: {
    async fetchUserInDb() {
      this.setIsRequesting(true);

      try {
        const { data } = await apiService.get('/api/users');
        const usernameCollection = data.map((user: User) => user.username);

        this.updateUsernameCollection(usernameCollection);
      } catch(error) {
        (new Toastify()).error(`Unable to get the user from the database. ${ error.message }`);
      } finally {
        this.setIsRequesting(false);
      }
    },
    async postUserInDb(userSentInDb: User) {
      this.setIsRequesting(true);

      try {
        const { data } = await apiService.post('/api/users', userSentInDb);

        (new Toastify()).info('Success adding ' + data.username + ' in the database.');

        this.resetUserSignUp();
      } catch(error) {
        (new Toastify()).error(`Unable to post the user in the database. ${ error.message }`);
      } finally {
        this.setIsRequesting(false);
      }
    },
    async fetchJobsInDb() {
      this.setIsJobsFetching(true);

      try {
        const { data } = await apiService.get('/api/jobs');

        this.updateJobCollection(data);
      } catch(error) {
        (new Toastify()).error(`Unable to get the jobs from the database. ${ error.message }`);
      } finally {
        this.setIsJobsFetching(false);
      }
    }
  },
});
