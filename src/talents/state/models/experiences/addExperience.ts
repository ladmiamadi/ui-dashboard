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
    updateExperience: (state: ExperienceState, payload: UpdateExperiencePayload): ExperienceState  => {
      const experience = { ...state.experience } as any;
      experience[payload.value] = payload.value;

      return {
        ...state, experience,
      };
    },
    resetExperience: (state: ExperienceState) =>
      ({ ...state, experience: UserExperienceFactory.createEmptyExperience() }),
  },
});
