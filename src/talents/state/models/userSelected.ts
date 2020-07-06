import { createModel } from '@rematch/core';
import { User, UserLanguage, UserTraining } from '../../../app';
import { createEmptyUser } from '../../../app/helpers/user';
import _ from 'lodash';

export interface UserState {
  userSelected: User,
}

export interface UpdateUserPayload {
  index: number,
  category: string,
  property: string,
  value: number | string,
}

export const userSelected = createModel ({
  state: {
    userSelected: createEmptyUser(),
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
    addUserTraining: (state: UserState, payload: UserTraining): UserState => {
      const userSelected = _.cloneDeep(state.userSelected) as User;

      const userTraining = userSelected.userTrainings?.concat(payload);
        // userSelected.userTrainings.concat(payload) :
        // [payload];

      userSelected.userTrainings = userTraining;

      return { ...state, userSelected };
    },
  },
});
