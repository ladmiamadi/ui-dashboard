import { createModel } from '@rematch/core';
import lodash from 'lodash';
import { UserExperience } from '../../../../app';
import { UserExperienceFactory } from '../../../helpers/UserExperienceFactory';

export interface ExperienceState {
  experience: UserExperience,
}

export interface UpdateExperiencePayload {
  property: string,
  value: string | Date | null,
}

export const addExperience = createModel({
  state: {
    experience: UserExperienceFactory.createEmptyExperience(),
  } as ExperienceState,
  reducers: {
    updateExperience: (state: ExperienceState, payload: UpdateExperiencePayload): ExperienceState => {
      const experience = lodash.cloneDeep(state.experience) as any;
      experience[payload.property] = payload.value;
      return {
        ...state, experience,
      };
    },
    resetExperience: (state: ExperienceState) =>
      ({ ...state, experience: UserExperienceFactory.createEmptyExperience() }),
  },
});
