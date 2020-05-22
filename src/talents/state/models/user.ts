import { createModel } from '@rematch/core';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { UserFactory } from '../../helpers/UserFactory';

type TalentState = {
  user: User,
}

export const user = createModel ({
  state: {
    user: UserFactory.createEmptyUser(),
  } as TalentState,
  reducers: {
    updateUser: (state:TalentState, payload: User) : TalentState => ({ ...state, user: payload })
  },
  effects: {
    async fetchUserById(id: number) {
      try {
        const { data } = await apiService.get(`/api/users/${id}`);
        console.log(data);
        this.updateUser(data);
      } catch (error) {
        (new Toastify()).error(`Failed to fetch the user. ${ error.message }`);

      }
    }
  }
});
