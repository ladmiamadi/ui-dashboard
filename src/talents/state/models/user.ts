import { createModel } from '@rematch/core';
import { User } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { UserFactory } from '../../helpers/UserFactory';

type TalentState = {
  user: User,
}

export interface UpdateUserPayload {
  property: string,
  value: number | string,
}

export const user = createModel ({
  state: {
    user: UserFactory.createEmptyUser(),
  } as TalentState,
  reducers: {
    updateUser: (state:TalentState, payload: User): TalentState => ({ ...state, user: payload }),
    modifyUser: (state:TalentState, payload: UpdateUserPayload) : TalentState => {
      const user = { ...state.user } as any;
      user[payload.property] = payload.value;

      return {
        ...state, user
      };
    }
  },
  effects: {
    async fetchUserById(id: number) {
      try {
        const { data } = await apiService.get(`/api/users/${id}`);
        this.updateUser(data);

      } catch (error) {
        (new Toastify()).error(`Failed to fetch the user. ${ error.message }`);

      }
    }
  }
});
