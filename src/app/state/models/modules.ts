import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { Module } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

interface State {
  list: Module[],
}

export const modules = createModel({
  state: {
    list: [],
  } as State,
  reducers: {
    updateList: (state: State, payload: Module[]): State => ({ list: payload }),
  },
  effects: {
    async fetchModules() {
      try {
        const { data } = await apiService.get('/api/modules');
        this.updateList(data);
      } catch (error) {
        (new Toastify()).error(`Module doesn't exist. ${ error.message }`);
      }
    },
  },
});
