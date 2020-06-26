import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { createEmptyUserSignUp, createEmptyIsFormValid } from '../../helpers/userSignUpFactoryHelper';
import { InputState, UserSignUpPayload, FormValidPayload } from '../..';
import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app/index.d';

export interface UserSignUp {
  birthDate: string,
  country: string,
  desiredJob: string,
  firstName: string,
  lastName: string,
  mailInstitution: string,  
  phone: string,
}

export type UserSignUpState = {
  isFormValid: IsFormValid,
  isRequesting: boolean,
  usernameCollection: string[],
  userSignUp: UserSignUp,
}

export interface IsFormValid {
  birthDate: InputState,
  country: InputState,
  desiredJob: InputState,
  firstName: InputState,
  lastName: InputState,
  mailInstitution: InputState,
  phone: InputState,
}

export const userSignUp = createModel({
  state: {
    isFormValid: createEmptyIsFormValid(),
    isRequesting: false,
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
  },
  effects: {
    async fetchUserInDb() {
      this.setIsRequesting(true);

      try {
        const { data } = await apiService.get('/api/users');
        const usernameCollection = data.map((user: User) => user.username)

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
  },
});
