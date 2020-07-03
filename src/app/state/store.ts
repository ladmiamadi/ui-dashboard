import { RematchRootState, init } from '@rematch/core';
import * as language  from '../../talents/state/models/languages/add-language';
import * as auth from '../../authentication/state/models/auth';
import * as modules from './models/modules';
import * as user from './models/user';
import * as users from '../../talents/state/models/users';
import * as userSelected from '../../talents/state/models/userSelected';

const models = {
  ...auth,
  ...user,
  ...users,
  ...modules,
  ...userSelected,
  ...language,
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
