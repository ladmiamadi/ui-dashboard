import { createModel } from '@rematch/core';
import { User, UserLanguage, UserTraining, UserExperience } from '../../../app';
import { createEmptyUser } from '../../../app/helpers/user';
import _ from 'lodash';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';

export interface UserState {
  userSelected: User,
  isRequesting: boolean,
}

export interface UpdateUserPayload {
  index: number,
  category: string,
  property: string,
  value: number | string | Date | [Date, Date] | null | boolean,
}

export const userSelected = createModel({
  state: {
    userSelected: createEmptyUser(),
    isRequesting: false,
  } as UserState,
  reducers: {
    updateUserSelected: (state: UserState, userSelected: User): UserState => ({ ...state, userSelected: userSelected }),
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
    addUserLanguage: (state: UserState, userLanguage: UserLanguage): UserState => {
      const updatedLanguages = state.userSelected.userLanguages?.map(language => ({ ...language }))
        .concat(userLanguage);
      const copyUserSelected: User = { ...state.userSelected };

      copyUserSelected.userLanguages = updatedLanguages;

      return { ...state, userSelected: copyUserSelected };
    },
    addUserExperience: (state: UserState, payload: UserExperience): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;

      const userExperience = userSelected.userExperiences ?
        userSelected.userExperiences.concat(payload) :
        [payload];

      userSelected.userExperiences = userExperience;

      return { ...state, userSelected };
    },
    addUserTraining: (state: UserState, payload: UserTraining): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;

      const userTraining = userSelected.userTrainings ?
        userSelected.userTrainings.concat(payload) :
        [payload];

      userSelected.userTrainings = userTraining;

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
        const { data } = await apiService.put(`/api/users/${user.id}`, user);

        (new Toastify()).info('Success saving user ' + data.username + ' in the database.');
      } catch(error) {
        (new Toastify()).error(`Unable to put the user in the database. ${ error.message }`);
      } finally {
        this.setIsRequesting(false);
      }
    },
  },
});
