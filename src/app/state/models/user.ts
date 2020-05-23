import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { createEmptyUser } from '../../helpers/user';
import { User } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

type UserState = {
  user: User,
};

export const user = createModel({
  state: {
    user: createEmptyUser(),
  },
  reducers: {
    updateUser: (state: UserState, user: User): UserState => ({ ...state, user: user }),
    resetUser: (state: UserState): UserState => ({ ...state, user: createEmptyUser() }),
  },
  effects: {
    async fetchUser() {
      try {
        const { data } = await apiService.get('/me');
        this.updateUser(data);
      } catch (error) {
        (new Toastify()).error(`User doesn't exist. ${ error.message }`);
      }
    },
  },
});
