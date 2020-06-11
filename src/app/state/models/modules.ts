import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { Module } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

interface State {
  modules: Module[],
}

export const modules = createModel({
  state: {
    modules: [],
  } as State,
  reducers: {
    updateList: (state: State, modules: Module[]): State => ({ modules }),
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
