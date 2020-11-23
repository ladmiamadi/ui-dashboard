import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createDtoUserIntern } from '../../../helpers/UserFactoryHelper';
import { FormValidator } from '../../../helpers/FormValidator';
import { IsFormValid, UserSignUp } from '../../../index.d';
import { Job, User } from '../../../../app';
import { RootState, RootDispatch } from '../../../../app/state/store';

interface Props {
  isFormValid: IsFormValid,
  isRequesting: boolean,
  jobCollection: Job[],
  userSignUp: UserSignUp,
  postUserInDb: (userSentInDb: User) => Promise<void>,
  resetUserSignUp: () => void,
  toggleModal: () => void,
}

export class ContentModalFooter extends React.Component<Props> {
  isPostAvailable = (): boolean => {
    return this.props.isRequesting ? false : FormValidator.isAllFieldValidated<IsFormValid>(this.props.isFormValid);
  }

  postUserInDb = () => {
    const userSentInDb = createDtoUserIntern(this.props.userSignUp, this.props.jobCollection);

    this.props.postUserInDb(userSentInDb);
  }

  render() {
    const isPostAvailable = this.isPostAvailable();
    const colorButtonAdd = isPostAvailable ? 'success' : 'primary';

    return (
      <>
        <Button
          color={colorButtonAdd}
          disabled={!isPostAvailable}
          onClick={this.postUserInDb}>
          Ajouter
        </Button>
        <Button
          color="warning"
          onClick={this.props.resetUserSignUp}>
          Tout effacer
        </Button>
        <Button
          color="secondary"
          onClick={this.props.toggleModal}>
          Retour
        </Button>
      </>
    );
  }
}
const mapState = (state: RootState) => ({
  isFormValid: state.userSignUp.isFormValid,
  isRequesting: state.userSignUp.isRequesting,
  jobCollection: state.userSignUp.jobCollection,
  userSignUp: state.userSignUp.userSignUp,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  postUserInDb: dispatch.userSignUp.postUserInDb,
  resetUserSignUp: dispatch.userSignUp.resetUserSignUp,
});

export default connect(mapState, mapDispatch)(ContentModalFooter);