import { createModel } from '@rematch/core';
import { Job } from '../../../app';
import { apiService } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';
import { createEmptyNewOffer } from './helpers/creatingOfferHelper';

interface NewJobState {
    isFetching: boolean,
    newJob: Job,
    positionCollection: [],
    linkFrenchCollection: [],
    linkEnglishCollection: [],
    jobs: Job[],
}

export const job = createModel({
    state: {
        isFetching: false,
        newJob: createEmptyNewOffer(),
        positionCollection: [],
        linkFrenchCollection: [],
        linkEnglishCollection: [],

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
        },

        updateOfferPositionCollection: (state: NewJobState, positionCollection: string[]) => ({ ...state, positionCollection }),

        updateLinkFrenchCollection: (state: NewJobState, linkFrenchCollection: string[]) => ({ ...state, linkFrenchCollection }),

        updateLinkEnglishCollection: (state: NewJobState, linkEnglishCollection: string[]) => ({ ...state, linkEnglishCollection }),
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

                this.fetchJobsFromDb();

                this.setIsRequesting(false);

                return newJob;
            } catch (error) {
                (new Toastify()).error(`Unable to post the Offer in the database. ${error.message}`);
                console.log(jobSentInDb)
                return null;
            }
        },

        async fetchJobsFromDb() {
            this.setIsRequesting(true);

            try {
                const { data: jobs } = await apiService.get<Job[]>('/api/jobs');
                const positionCollection = jobs.map((job: Job) => job.position);
                const linkFrenchCollection = jobs.map((job: Job) => job.linkFrench);
                const linkEnglishCollection = jobs.map((job: Job) => job.linkEnglish);

                this.updateOfferPositionCollection(positionCollection);
                this.updateLinkFrenchCollection(linkFrenchCollection);
                this.updateLinkEnglishCollection(linkEnglishCollection);
            } catch (error) {
                (new Toastify()).error(`Impossible de récupérer les offres depuis la base de données. ${error.message}`);
            } finally {
                this.setIsRequesting(false);
            }
        },
    },
});