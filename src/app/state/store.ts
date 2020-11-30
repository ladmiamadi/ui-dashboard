import { init, RematchRootState } from '@rematch/core';
import * as experience from '../../talents/state/models/experiences/addExperience';
import * as language from '../../talents/state/models/languages/add-language';
import * as userLanguages from '../../talents/state/models/languages/user-languages';
import * as userSelected from '../../talents/state/models/user-selected';
import * as userSignUp from '../../talents/state/models/user-sign-up';
import * as users from '../../talents/state/models/users';
import * as modules from './models/modules';
import * as user from './models/user';
import * as timeline from '../../timeline/state/models/timeline';

const models = {
  ...experience,
  ...language,
  ...modules,
  ...user,
  ...userLanguages,
  ...users,
  ...userSelected,
  ...userSignUp,
  ...timeline,
};

export const store = init({
  models,
});

export type RootState = RematchRootState<typeof models>;
export type RootDispatch = typeof store.dispatch;

declare module 'react-redux' {
  interface Connect {
    // eslint-disable-next-line camelcase
    <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
      mapStateToProps: null | undefined,
      mapDispatchToProps: (dispatch: RootDispatch) => TDispatchProps,
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps: (dispatch: RootDispatch) => TDispatchProps,
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;
  }
}
