import { createModel } from '@rematch/core';
import { FormValidPayload, IsFormValid, UserSignUp, UserSignUpPayload } from '../..';
import { Job, User } from '../../../app';
import { createEmptyUser } from '../../../app/helpers/UserHelpers';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { UserAdapterHelper } from '../../helpers/UserAdapterHelper';
import { createEmptyIsFormValid, createEmptyUserSignUp } from '../../helpers/UserSignUpFactoryHelper';

export interface UserSignUpState {
  isEmailSent: boolean,
  isFormValid: IsFormValid,
  isJobsFetching: boolean,
  isRequesting: boolean,
  jobCollection: Job[],
  usernameCollection: string[],
  userSignUp: UserSignUp,
  defaultRecruiterUser: User,
}

export const userSignUp = createModel({
  state: {
    isEmailSent: false,
    isFormValid: createEmptyIsFormValid(),
    isJobsFetching: false,
    isRequesting: false,
    jobCollection: [],
    usernameCollection: [],
    userSignUp: createEmptyUserSignUp(),
    defaultRecruiterUser: createEmptyUser(),
  } as UserSignUpState,
  reducers: {
    concatUsername: (state: UserSignUpState, payload: string) => {
      const updatedUsernameCollection: string[] = [...state.usernameCollection]
        .concat(payload);

      return ({
        ...state,
        usernameCollection: updatedUsernameCollection,
      });
    },
    resetUserSignUp: (state: UserSignUpState): UserSignUpState => ({
      ...state,
      isFormValid: createEmptyIsFormValid(),
      userSignUp: createEmptyUserSignUp(),
    }),
    setIsFormValid: (state: UserSignUpState, payload: FormValidPayload): UserSignUpState => {
      const newIsFormValid: IsFormValid = {
        ...state.isFormValid,
      };

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
    setIsEmailSent: (state: UserSignUpState, isEmailSent: boolean): UserSignUpState => ({
      ...state,
      isEmailSent,
    }),
    setIsRequesting: (state: UserSignUpState, isRequesting: boolean): UserSignUpState => ({
      ...state,
      isRequesting,
    }),
    updateUserSignUp: (state: UserSignUpState, payload: UserSignUpPayload): UserSignUpState => {
      const newUserSignUp: UserSignUp = {
        ...state.userSignUp,
      };

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
    updateDefaultRecruiterUser: (state: UserSignUpState, defaultRecruiterUser: User) => ({
      ...state,
      defaultRecruiterUser,
    }),
  },
  effects: {
    async fetchUsersInDb() {
      this.setIsRequesting(true);

      try {
        const { data: users } = await apiService.get<User[]>('/api/users');
        const usernameCollection = users.map((user: User) => user.username);
        const defaultRecruiterUser = users.find(user => user.username === 'test1@test.com');

        this.updateUsernameCollection(usernameCollection);

        if (defaultRecruiterUser === undefined) {
          throw new Error('Missing pre-defined recruiter');
        }

        this.updateDefaultRecruiterUser(defaultRecruiterUser);
      } catch (error) {
        (new Toastify()).error(`Unable to get the user from the database. ${error.message}`);
      } finally {
        this.setIsRequesting(false);
      }
    },
    async postUserInDb(userSentInDb: User): Promise<User | null> {
      this.setIsRequesting(true);

      try {
        const { data } = await apiService.post('/api/users', userSentInDb);
        const newUser = data as User;

        this.concatUsername(newUser.username);
        UserAdapterHelper.postprocessUser(newUser);

        (new Toastify()).info('Success adding ' + newUser.username + ' in the database.');

        this.resetUserSignUp();
        this.setIsRequesting(false);

        return newUser;
      } catch (error) {
        (new Toastify()).error(`Unable to post the user in the database. ${error.message}`);
        return null;
      }
    },
    async fetchJobsInDb() {
      this.setIsJobsFetching(true);

      try {
        const { data } = await apiService.get('/api/jobs');

        this.updateJobCollection(data);
      } catch (error) {
        (new Toastify()).error(`Unable to get the jobs from the database. ${error.message}`);
      } finally {
        this.setIsJobsFetching(false);
      }
    },
    async sendTalentConfigEmail(userEmail?: string) {
      try {
        const user = { username: userEmail };
        const { data } = await apiService.post('/api/users/new-talent', user);

        if(data.message) {
          throw new Error(data.message);
        } else {
          this.setIsEmailSent(true);
        }
      } catch (error) {
        (new Toastify()).error(`Unable to send the configuration email. ${error.message}`);
      } 
    },
  },
});
