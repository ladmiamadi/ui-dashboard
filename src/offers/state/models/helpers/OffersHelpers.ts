import { Job } from "../../../../app";
import { env } from "../../../../helpers/environment";

const DEFAULT_JOB_IMG = '/job-search.jpg';

export class OffersHelpers {
    public static getOfferPictureUrl(offer: Job): string {
        console.log(env)
        return env('MEDIA_URL_JOBS')
            + (offer.picture
                ? `${offer.picture}`
                : DEFAULT_JOB_IMG);
    }

}