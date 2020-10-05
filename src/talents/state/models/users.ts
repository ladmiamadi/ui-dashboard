import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { createEmptyUser } from '../../../app/helpers/user';

interface State {
  users: User[],
  userSelected: User,
  isFetching: boolean,
}

export const users = createModel({
  state: {
    users: [],
    userSelected: createEmptyUser(),
    isFetching: false,
  } as State,

  reducers: {
    updateList: (state: State, users: User[]): State => ({ ...state, users: users }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    updateUserSelected: (state: State, user: User): State => ({ ...state, userSelected: user }),
  },

  effects: {
    async fetchTalents() {
      try {
        this.setIsFetching(true);
        const { data } = await apiService.get('/api/users');

        this.updateList(data);
      } catch(error) {
        (new Toastify()).error(`Unable to fetch talents. ${ error.message }`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
