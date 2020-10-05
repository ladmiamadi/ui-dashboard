import { apiService } from '../../http/service';
import { UserFactory } from '../../../talents/helpers/UserFactory';
import { createModel } from '@rematch/core';
import { User } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

interface State {
  user: User,
  isFetching: boolean,
}

export const user = createModel({
  state: {
    user: UserFactory.createEmptyUser(),
    isFetching: false,
  } as State,
  reducers: {
    updateUser: (state: State, user: User): State => ({ ...state, user }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    resetUser: (state: State): State => ({ ...state, user: UserFactory.createEmptyUser() }),
  },
  effects: {
    async fetchUser(id:number) {
      this.setIsFetching(true);
      try {
        const { data } = await apiService.get('api/users' + { id });

        this.updateUser(data);
      } catch (error) {
        (new Toastify()).error(`User doesn't exist. ${ error.message }`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});
