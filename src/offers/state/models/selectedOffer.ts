import { createModel } from '@rematch/core';
import { Job } from '../../../app';
import { createEmptyJob } from '../../../app/helpers/OfferHelpers';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';

export interface OfferState {
    isRequesting: boolean,
    selectedOffer: Job,
    jobs: Job[]
}

export const selectedOffer = createModel({
    state: {
        isRequesting: false,
        selectedOffer: createEmptyJob(),
        jobs: [],
    } as OfferState,

    reducers: {
        //updateList: (state: OfferState, jobs: Job[]): OfferState => ({ ...state, jobs }),

        updateSelectedOffers: (state: OfferState, selectedOffer: Job): OfferState => ({ ...state, selectedOffer }),

        updateSelectedOffer: (state: OfferState, selectedOffer: Job): OfferState => {
            console.log(selectedOffer)
            // selectedOffer.isOpen = !selectedOffer.isOpen;
            return { ...state, selectedOffer }
        },


        setIsRequesting: (state: OfferState, isRequesting: boolean): OfferState => ({
            ...state,
            isRequesting,
        }),
    },
    effects: {

        async switchActiveOffer(job: Job) {
            this.updateSelectedOffer(job)
            this.setIsRequesting(true);

            try {
                const { data: updatedOffer } = await apiService.put<Job>(`/api/jobs/${job.id}`, job);

                this.updateSelectedOffers(updatedOffer);

                (new Toastify()).info('Success saving job ' + updatedOffer.titleInFrench + ' in the database.');
            } catch (error) {
                (new Toastify()).error(`Unable to put the job in the database. ${error.message}`);
            } finally {
                this.setIsRequesting(false);
            }
        },
    },
});
