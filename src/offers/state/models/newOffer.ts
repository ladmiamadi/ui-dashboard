import { createModel } from '@rematch/core';
import { Job } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { createEmptyNewOffer } from './helpers/creatingOfferHelper';

interface NewJobState {
    isFetching: boolean,
    newJob: Job,
}

export const job = createModel({
    state: {
        isFetching: false,
        newJob: createEmptyNewOffer(),
    } as NewJobState,

    reducers: {
        setIsRequesting: (state: NewJobState, isFetching: boolean): NewJobState => ({ ...state, isFetching }),
        setNewJob: (state: NewJobState, newJob: Job): NewJobState => ({ ...state, newJob }),
        setFields: (state: NewJobState, newJob: Job): NewJobState => {
            {
                newJob.isOpen = false;
                newJob.createdDate = new Date();
                return { ...state, newJob }
            }
        }
    },

    effects: {
        async postNewOfferInDb(jobSentInDb: Job): Promise<Job | null> {
            this.setIsRequesting(true);

            try {
                this.setFields(jobSentInDb);
                this.setNewJob(jobSentInDb);

                const { data } = await apiService.post('/api/jobs', jobSentInDb);
                const newJob = data as Job;

                //UserAdapterHelper.postprocessUser(newUser);

                (new Toastify()).info('Success adding ' + newJob.titleInFrench + ' in the database.');

                //this.resetUserSignUp();
                this.setIsRequesting(false);

                //return newJob;
                return null;
            } catch (error) {
                (new Toastify()).error(`Unable to post the Offer in the database. ${error.message}`);
                console.log(jobSentInDb)
                return null;
            }
        },
    },
});