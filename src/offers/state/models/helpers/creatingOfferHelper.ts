import { CreateOffer, InputState, IsFormValid, OfferRegister } from "../../..";
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


export const createEmptyForm = (): IsFormValid => ({
    titleInFrench: InputState.UNDEFINED,
    titleInEnglish: InputState.UNDEFINED,
    titleInDutch: InputState.TRUE,
    shortDescriptionInFrench: InputState.UNDEFINED,
    shortDescriptionInEnglish: InputState.UNDEFINED,
    shortDescriptionInDutch: InputState.TRUE,
    position: InputState.UNDEFINED,
    linkEnglish: InputState.UNDEFINED,
    linkFrench: InputState.UNDEFINED,
    picture: InputState.UNDEFINED,
});
