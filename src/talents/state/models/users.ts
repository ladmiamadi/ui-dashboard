import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';

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
    updateList: (state: State, talents: User[]): State => ({ ...state, users: talents }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
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
