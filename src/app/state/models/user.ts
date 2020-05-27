import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { createEmptyUser } from '../../helpers/user';
import { User } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

interface State {
  user: User,
}

export const user = createModel({
  state: {
    user: createEmptyUser(),
  } as State,
  reducers: {
    updateUser: (state: State, user: User): State => ({ ...state, user: user }),
    resetUser: (state: State): State => ({ ...state, user: createEmptyUser() }),
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
