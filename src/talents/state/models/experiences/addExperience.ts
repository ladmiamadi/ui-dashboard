import { createModel } from '@rematch/core';
import { UserExperience } from '../../../../app';
import { UserExperienceFactory } from '../../../helpers/UserExperienceFactory';

export interface ExperienceState {
  experience: UserExperience,
}

export interface UpdateExperiencePayload {
  value: string,
}

export const addExperience = createModel({
  state: {
    experience: UserExperienceFactory.createEmptyExperience(),
  } as ExperienceState,
  reducers: {
    updateExperience: (state: ExperienceState, experience: UserExperience): ExperienceState  => ({
      /*      const experience = { ...state.experience } as any;
      userExperience = payload.value;*/
      ...state, experience,

      /*      return {
        ...state, experience,
      };*/
    }),
    resetExperience: (state: ExperienceState) =>
      ({ ...state, experience: UserExperienceFactory.createEmptyExperience() }),
  },
});
