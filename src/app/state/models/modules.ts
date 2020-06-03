import { apiService } from '../../http/service';
import { createModel } from '@rematch/core';
import { Module } from '../../index';
import { Toastify } from '../../../helpers/Toastify';

type ModulesState = {
	list: Module[];
};

export const modules = createModel({
  state: {
    list: [],
  } as ModulesState,
  reducers: {
    updateModulesList: (state: ModulesState, payload: Module[]): ModulesState => ({ list: payload }),
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
