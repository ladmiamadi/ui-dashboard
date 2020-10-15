import { Toastify } from '../../../helpers/Toastify';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { UsersDatesFormatter } from '../../../app/formatter/usersDatesFormatter';
//import { SearchBar } from '../../../app/components/utils/SearchBar';
interface State {
  searchTerm: string,
  filteredUsers: User[],
  users: User[],
  isFetching: boolean,
}

export const users = createModel({
  state: {
    searchTerm: '',
    filteredUsers: [],
    users: [],
    isFetching: false,
  } as State,

  reducers: {
    updateList: (state: State, users: User[]): State => ({ ...state, users }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    initLists: (state: State, users: User[]): State => ({ ...state, users, filteredUsers: users }),
    updateSearchTerm: (state: State, searchTerm: string): State => ({ ...state, searchTerm }),
    updateFilteredUsers: (state: State): State => {
      const filteredUsers = state.users.filter(u => u.username.includes(state.searchTerm));
      return ({...state, filteredUsers })
    },
  },

  effects: {
    async fetchTalents() {
      try {
        this.setIsFetching(true);
        const { data } = await apiService.get('/api/users');

        UsersDatesFormatter.transformDateFormat(data);

        this.initLists(data);
      } catch(error) {
        (new Toastify()).error(`Unable to fetch talents. ${ error.message }`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});