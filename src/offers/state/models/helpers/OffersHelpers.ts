import { Job } from "../../../../app";
import { env } from "../../../../helpers/environment";

export const DEFAULT_JOB_IMG = '/job-search.jpg';

export class OffersHelpers {
    public static getOfferPictureUrl(offer: Job): string {
        return env('MEDIA_URL_JOBS')
            + (offer.picture
                ? `${offer.picture}`
                : DEFAULT_JOB_IMG);
    }
}

export const isValueExists = (idValue: string | undefined, collection: string[]): boolean => {
    const isValueUnique = collection.includes(idValue!);

    return isValueUnique;
};