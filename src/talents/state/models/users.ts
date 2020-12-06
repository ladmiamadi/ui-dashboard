import { createModel } from '@rematch/core';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { UserAdapterHelper } from '../../helpers/UserAdapterHelper';

interface State {
  searchTerm: string,
  users: User[],
  isFetching: boolean,
}

export const users = createModel({
  state: {
    searchTerm: '',
    users: [],
    isFetching: false,
  } as State,

  reducers: {
    updateList: (state: State, users: User[]): State => ({ ...state, users }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    updateSearchTerm: (state: State, searchTerm: string): State => ({ ...state, searchTerm }),
  },

  effects: {
    async fetchTalents() {
      try {
        this.setIsFetching(true);
        const { data: users } = await apiService.get<User[]>('/api/users');

        UserAdapterHelper.postprocessUsers(users);

        this.updateList(users);
      } catch (error) {
        (new Toastify()).error(`Unable to fetch talents. ${error.message}`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});