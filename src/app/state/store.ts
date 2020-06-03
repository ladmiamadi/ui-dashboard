import { RematchRootState, init } from '@rematch/core';
import * as language  from '../../talents/components/form/state/models/languages/addLanguage';
import * as languages from '../../talents/components/form/state/models/languages/userLanguages';
import * as modules from './models/modules';
import * as user from './models/user';

const models = {
  ...modules,
  ...user,
  ...language,
  ...languages,
};

export const store = init({
  models,
});

export type RootState = RematchRootState<typeof models>
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
