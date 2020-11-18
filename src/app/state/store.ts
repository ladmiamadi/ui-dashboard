import { init, RematchRootState } from '@rematch/core';
import * as experience from '../../talents/state/models/experiences/addExperience';
import * as language from '../../talents/state/models/languages/add-language';
import * as userLanguages from '../../talents/state/models/languages/user-languages';
import * as userSelected from '../../talents/state/models/user-selected';
import * as userSignUp from '../../talents/state/models/user-sign-up';
import * as users from '../../talents/state/models/users';
import * as modules from './models/modules';
import * as user from './models/user';
<<<<<<< HEAD
import * as users from '../../talents/state/models/users';
import * as userSelected from '../../talents/state/models/userSelected';
import * as userSignUp from '../../talents/state/models/userSignUp';
import * as userLanguages from '../../talents/state/models/languages/user-languages';
import * as timeline from '../../timeline/state/models/timeline';
=======
>>>>>>> 95d530a0c44ab6c5481cb0a7ad5ffee99366e4b6

const models = {
  ...experience,
  ...language,
  ...modules,
  ...user,
  ...userLanguages,
  ...users,
  ...userSelected,
  ...userSignUp,
<<<<<<< HEAD
  ...experience,
  ...timeline,
=======
>>>>>>> 95d530a0c44ab6c5481cb0a7ad5ffee99366e4b6
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