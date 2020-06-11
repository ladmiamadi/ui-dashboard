import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { createEmptyUserSignUp, createEmptyIsFormValid } from '../../helpers/userSignUpFactory';
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
  listUserUsername: string[],
  userSignUp: UserSignUp,
}

export interface IsFormValid {
  birthDate: boolean | undefined,
  country: boolean | undefined,
  desiredJob: boolean | undefined,
  firstName: boolean | undefined,
  lastName: boolean | undefined,
  mailInstitution: boolean | undefined,
  phone: boolean | undefined,
}

export const userSignUp = createModel({
  state: {
    isFormValid: createEmptyIsFormValid(),
    isRequesting: false,
    listUserUsername: [],
    userSignUp: createEmptyUserSignUp(),
  } as UserSignUpState,
  reducers: {
    // eslint-disable-next-line max-len
    resetUserSignUp: (state: UserSignUpState): UserSignUpState => ({ ...state, userSignUp: createEmptyUserSignUp(), isFormValid: createEmptyIsFormValid() }),
    setIsFormValid: (state: UserSignUpState, isFormValid: IsFormValid): UserSignUpState => ({ ...state, isFormValid }),
    setIsRequesting: (state: UserSignUpState, isRequesting: boolean): UserSignUpState => ({ ...state, isRequesting }),
    updateUserSignUp: (state: UserSignUpState, userSignUp: UserSignUp): UserSignUpState => ({ ...state, userSignUp }),
    updateListUserUsername: (state: UserSignUpState, listUserUsername: string[]) => ({ ...state, listUserUsername }),
  },
  effects: {
    async fetchUserInDb() {
      this.setIsRequesting(true);

      try {
        await apiService.get('/api/users')
          .then(rep => {
            const listUserUsername = rep.data.map((user: User) => user.username);
            this.updateListUserUsername(listUserUsername);
          });
      } catch (error) {
        (new Toastify()).error(`Unable to get the user from the database. ${ error.message }`);
      }finally {
        this.setIsRequesting(false);
      }
    },
    async postUserInDb(userSentInDb: User) {
      this.setIsRequesting(true);

      try {
        await apiService.post('/api/users', userSentInDb)
          .then((rep) => (new Toastify()).info('Success adding ' + rep.data.username + ' in the database.'));
        this.resetUserSignUp();
      } catch (error) {
        (new Toastify()).error(`Unable to post the user in the database. ${ error.message }`);
      } finally {
        this.setIsRequesting(false);
      }
    },
  },
});
