import { createModel } from '@rematch/core';
import _ from 'lodash';
import { UserExperience } from '../../../../app';
import { UserExperienceFactory } from '../../../helpers/UserExperienceFactory';

export interface ExperienceState {
  experience: UserExperience,
}

export interface UpdateExperiencePayload {
  property: string,
  value: string | Date | Date[],
}

export const addExperience = createModel({
  state: {
    experience: UserExperienceFactory.createEmptyExperience(),
  } as ExperienceState,
  reducers: {
    updateExperience: (state: ExperienceState, payload: UpdateExperiencePayload): ExperienceState => {
      const experience = _.cloneDeep(state.experience) as any;
      //if(payload.property)
      experience[payload.property] = payload.value;
      console.log('payload property : ' + payload.property + 'payload value : ' + payload.value);
      console.log(experience);
      return {
        ...state, experience,
      };
    },
    resetExperience: (state: ExperienceState) =>
      ({ ...state, experience: UserExperienceFactory.createEmptyExperience() }),
  },
});
