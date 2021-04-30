import { createModel } from '@rematch/core';
import { Job } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { createEmptyJob } from './helpers/creatingOfferHelper';

export interface OfferState {
    isRequesting: boolean,
    selectedOffer: Job,
    jobs: Job[],
}

export const selectedOffer = createModel({
    state: {
        isRequesting: false,
        selectedOffer: createEmptyJob(),
        jobs: [],
    } as OfferState,

    reducers: {
        setIsRequesting: (state: OfferState, isRequesting: boolean): OfferState => ({
            ...state,
            isRequesting,
        }),

    },

    effects: {
        async switchActiveOffer(job: Job) {
            this.setIsRequesting(true);

            try {
                const { data: updatedOffer } = await apiService.put<Job>(`/api/jobs/${job.id}`, job);

                (new Toastify()).info('Success saving job ' + updatedOffer.titleInFrench + ' in the database.');
            } catch (error) {
                (new Toastify()).error(`Unable to put the job in the database. ${error.message}`);
            } finally {
                this.setIsRequesting(false);
            }
        },
    },
});
