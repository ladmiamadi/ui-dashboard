
import { CreateOffer } from "../../..";
import { Job } from "../../../../app";

export const createEmptyJob = (): Job => ({
    id: -1,
    titleInFrench: '',
    titleInEnglish: '',
    titleInDutch: '',
    shortDescriptionInFrench: '',
    shortDescriptionInEnglish: '',
    shortDescriptionInDutch: '',
    longDescriptionInFrench: '',
    longDescriptionInEnglish: '',
    longDescriptionInDutch: '',
    position: '',
    linkEnglish: '',
    linkFrench: '',
    picture: "",
    isOpen: false,
    createdDate: new Date(),
    updatedDate: new Date(),
});

export const createEmptyNewOffer = (): CreateOffer => ({
    titleInFrench: '',
    titleInEnglish: '',
    titleInDutch: '',
    shortDescriptionInFrench: '',
    shortDescriptionInEnglish: '',
    shortDescriptionInDutch: '',
    longDescriptionInFrench: '',
    longDescriptionInEnglish: '',
    longDescriptionInDutch: '',
    position: '',
    linkEnglish: '',
    linkFrench: '',
    picture: '',
});
