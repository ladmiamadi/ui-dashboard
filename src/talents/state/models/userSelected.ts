import { createModel } from '@rematch/core';
import { User } from '../../../app';
import { createEmptyUser } from '../../../app/helpers/user';

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
      const userSelected = { ...state.userSelected } as any;

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
  },
});
