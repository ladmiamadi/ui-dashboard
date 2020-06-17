import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { createEmptyUserSignUp, createEmptyIsFormValid } from '../../helpers/userSignUpFactory';
import { InputState } from './../../components/registerUser/index.d';
import { Toastify } from '../../../helpers/Toastify';
import { User } from '../..';

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
  listOfAllUsernameOfUsers: string[],
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
    listOfAllUsernameOfUsers: [],
    userSignUp: createEmptyUserSignUp(),
  } as UserSignUpState,
  reducers: {
    resetUserSignUp: (state: UserSignUpState): UserSignUpState => ({ 
      ...state, userSignUp: createEmptyUserSignUp(), 
      isFormValid: createEmptyIsFormValid(), 
    }),
    setIsFormValid: (state: UserSignUpState, id: string, isInputValid: boolean): UserSignUpState => { 
      const oldIsFormValid = {
        ...state.isFormValid,
      } as any;
  
      oldIsFormValid[id] = isInputValid;
  
      const newIsFormValid = {
        ...oldIsFormValid,
      } as IsFormValid;

      return ({
        ...state, 
        isFormValid: newIsFormValid,
      });
    },
    setIsRequesting: (state: UserSignUpState, isRequesting: boolean): UserSignUpState => ({
      ...state, 
      isRequesting, 
    }),
    updateUserSignUp: (state: UserSignUpState, id: string, idValue: string): UserSignUpState => { 
      const oldUserSignUp = {
        ...state.userSignUp,
      } as any;
  
      oldUserSignUp[id] = idValue;
  
      const newUserSignUp = {
        ...oldUserSignUp,
      } as UserSignUp;

      return ({
        ...state, 
        userSignUp: newUserSignUp, 
      });
    },
    updateListOfAllUsernameOfUsers: (state: UserSignUpState, listOfAllUsernameOfUsers: string[]) => ({ 
      ...state, 
      listOfAllUsernameOfUsers, 
    }),
  },
  effects: {
    async fetchUserInDb() {
      this.setIsRequesting(true);

      try {
        await apiService.get('/api/users')
          .then(rep => {
            const listOfAllUsernameOfUsers = rep.data.map((user: User) => user.username);

            this.updateListOfAllUsernameOfUsers(listOfAllUsernameOfUsers);
          });
      } catch(error) {
        (new Toastify()).error(`Unable to get the user from the database. ${ error.message }`);
      } finally {
        this.setIsRequesting(false);
      }
    },
    async postUserInDb(userSentInDb: User) {
      this.setIsRequesting(true);

      try {
        await apiService.post('/api/users', userSentInDb)
          .then((rep) => (new Toastify()).info('Success adding ' + rep.data.username + ' in the database.'));

        this.resetUserSignUp();
      } catch(error) {
        (new Toastify()).error(`Unable to post the user in the database. ${ error.message }`);
      } finally {
        this.setIsRequesting(false);
      }
    },
  },
});
