import { createModel } from '@rematch/core';
import { Job } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';

interface State {
  searchTerm: string,
  jobs: Job[],
  isFetching: boolean,
}

export const jobs = createModel({
  state: {
    searchTerm: '',
    jobs: [],
    isFetching: false,
  } as State,

  reducers: {
    updateList: (state: State, jobs: Job[]): State => ({ ...state, jobs }),
    setIsFetching: (state: State, isFetching: boolean): State => ({ ...state, isFetching }),
    updateSearchTerm: (state: State, searchTerm: string): State => ({ ...state, searchTerm }),
  },

  effects: {
    async fetchOffers() {
      try {
        this.setIsFetching(true);
        const { data: jobs } = await apiService.get<Job[]>('/api/jobs');
        console.log(jobs)

        //UserAdapterHelper.postprocessUsers(jobs);

        this.updateList(jobs);
      } catch (error) {
        (new Toastify()).error(`Unable to fetch jobs. ${error.message}`);
      } finally {
        this.setIsFetching(false);
      }
    },
  },
});