import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { Module } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

interface ModulesState {
  modules: Module[],
}

export const modules = createModel({
  state: {
    modules: [],
  } as ModulesState,
  reducers: {
    updateModulesList: (state: ModulesState, payload: Module[]): ModulesState => ({ modules: payload }),
  },
  effects: {
    async fetchModules() {
      try {
        const { data } = await apiService.get('/api/modules');
        this.updateModulesList(data);
      } catch (error) {
        new Toastify().error(`Module doesn't exist. ${error.message}`);
      }
    },
  },
});
