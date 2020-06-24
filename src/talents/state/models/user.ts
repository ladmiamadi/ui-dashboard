import { createModel } from '@rematch/core';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { UserFactory } from '../../helpers/UserFactory';

export interface UserState {
  user: User,
  isFetching: boolean,
}

export interface UpdateUserPayload {
  index: number,
  category: string,
  property: string,
  value: number | string,
}

export const user = createModel ({
  state: {
    user: UserFactory.createEmptyUser(),
    isFetching: false,
  } as UserState,
  reducers: {
    updateUser: (state: UserState, user: User): UserState => ({ ...state, user }),
    setIsFetching: (state: UserState, isFetching: boolean): UserState => ({ ...state, isFetching }),
    modifyUser: (state: UserState, payload: UpdateUserPayload): UserState => {
      const user = { ...state.user }  as any;

      if (payload.index !== -1) {
        user[payload.category][payload.index][payload.property] = payload.value;

      } else if (payload.property) {
        user[payload.category][payload.property] = payload.value;

      } else {
        user[payload.category] = payload.value;
      }

      return {
        ...state, user,
      };
    },
  },
  effects: {
    async fetchUserById(id: number) {
      try {
        this.setIsFetching(true);

        const { data } = await apiService.get(`/api/users/${id}`);
        console.log(data);
        
        this.updateUser(data);

      } catch (error) {
        (new Toastify()).error(`Failed to fetch the user. ${ error.message }`);

      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
