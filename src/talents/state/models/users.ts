import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { UserBuilder } from '../../../app/helpers/userBuilder';

interface State {
  users: User[],
  isFetching: boolean,
}

export const users = createModel({
  state: {
    users: [],
    isFetching: false,
  } as State,

  reducers: {
    updateList: (state: State, users: User[]): State => ({ ...state, users: users }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
  },

  effects: {
    async fetchTalents() {
      this.setIsFetching(true);

      try {
        const { data } = await apiService.get('/api/users');

        UserBuilder.transformDateFormat(data);

        this.updateList(data);
      } catch(error) {
        (new Toastify()).error(`Unable to fetch talents. ${ error.message }`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
