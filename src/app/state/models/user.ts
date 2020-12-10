import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { createEmptyUser } from '../../helpers/UserHelpers';
import { User } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

interface State {
  user: User,
  isFetching: boolean,
}

export const user = createModel({
  state: {
    user: createEmptyUser(),
    isFetching: false,
  } as State,
  reducers: {
    updateUser: (state: State, user: User): State => ({ ...state, user }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    resetUser: (state: State): State => ({ ...state, user: createEmptyUser() }),
  },
  effects: {
    async fetchUser(id: number) {
      this.setIsFetching(true);
      try {
        const { data: user } = await apiService.get<User>('api/users' + { id });

        this.updateUser(user);
      } catch (error) {
        (new Toastify()).error(`User doesn't exist. ${error.message}`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
