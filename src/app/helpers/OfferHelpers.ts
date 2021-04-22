import { Job } from "..";

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
    picture: {
        filePath: ''
    },
    isOpen: false,
    createdDate: new Date,
    updatedDate: new Date,
});

