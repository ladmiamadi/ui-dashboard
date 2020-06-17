import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { createEmptyUser } from '../../../app/helpers/user';

interface State {
  users: User[],
  user: User,
  isFetching: boolean,
}

export const users = createModel({
  state: {
    users: [],
    user: createEmptyUser(),
    isFetching: false,
  } as State,

  reducers: {
    updateList: (state: State, talents: User[]): State => ({ ...state, users: talents }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    updateUser: (state: State, user: User): State => ({ ...state, user: user }),
  },

  effects: {
    async fetchTalents() {
      this.setIsFetching(true);

      try {
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
