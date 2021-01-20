import { createModel } from '@rematch/core';
import _ from 'lodash';
import { User, UserExperience, UserLanguage, UserTraining } from '../../../app';
import { UsersDatesFormatter } from '../../../app/formatter/usersDatesFormatter';
import { createEmptyUser } from '../../../app/helpers/UserHelpers';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';

export interface UserState {
  isRequesting: boolean,
  userSelected: User,
}

export interface UpdateUserPayload {
  category: string,
  index: number,
  property: string,
  value: any,
}

export const userSelected = createModel({
  state: {
    isRequesting: false,
    userSelected: createEmptyUser(),
  } as UserState,
  reducers: {
    updateUserSelected: (state: UserState, userSelected: User): UserState => ({ ...state, userSelected }),
    modifyUser: (state: UserState, payload: UpdateUserPayload): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as any;

      if (payload.index !== -1) {
        userSelected[payload.category][payload.index][payload.property] = payload.value;
      } else if (payload.property) {
        userSelected[payload.category][payload.property] = payload.value;
      } else {
        userSelected[payload.category] = payload.value;
      }

      return {
        ...state, userSelected,
      };
    },
    addUserLanguage: (state: UserState, payload: UserLanguage): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;

      userSelected.userLanguages = userSelected.userLanguages ?
        userSelected.userLanguages.concat(payload) :
        [payload];

      return { ...state, userSelected };
    },
    addUserExperience: (state: UserState, payload: UserExperience): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;

      userSelected.userExperiences = userSelected.userExperiences ?
        userSelected.userExperiences.concat(payload) :
        [payload];

      return { ...state, userSelected };
    },
    addUserTraining: (state: UserState, payload: UserTraining): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;

      userSelected.userTrainings = userSelected.userTrainings ?
        userSelected.userTrainings.concat(payload) :
        [payload];

      return { ...state, userSelected };
    },
    removeUserTraining: (state: UserState, trainingIndex: number): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;
      userSelected.userTrainings?.splice(trainingIndex, 1);

      return { ...state, userSelected };
    },
    removeUserExperience: (state: UserState, experienceIndex: number): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;
      userSelected.userExperiences?.splice(experienceIndex, 1);

      return { ...state, userSelected };
    },
    setIsRequesting: (state: UserState, isRequesting: boolean): UserState => ({
      ...state,
      isRequesting,
    }),
  },
  effects: {
    async saveUserInDb(user: User) {
      this.setIsRequesting(true);

      try {
        delete user.userRole;

        const { data: updatedUser } = await apiService.put<User>(`/api/users/${user.id}`, user);

        UsersDatesFormatter.transformUserDateFormat(updatedUser);
        this.updateUserSelected(updatedUser);

        (new Toastify()).info('Success saving user ' + updatedUser.username + ' in the database.');
      } catch (error) {
        (new Toastify()).error(`Unable to put the user in the database. ${error.message}`);
      } finally {
        this.setIsRequesting(false);
      }
    },
  },
});
