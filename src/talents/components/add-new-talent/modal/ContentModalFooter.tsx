import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { InputState, IsFormValid, UserSignUp } from '../../../index.d';
import { formValidator } from '../../../helpers/formValidatorHelper';
import { createDtoUserIntern } from '../../../helpers/userFactoryHelper';
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
  isPostAvailable = (): InputState => {
    return this.props.isRequesting ? InputState.FALSE : formValidator(this.props.isFormValid);
  }

  postUserInDb = () => {
    const userSentInDb = createDtoUserIntern(this.props.userSignUp, this.props.jobCollection);

    this.props.postUserInDb(userSentInDb);
  }

  render() {
    const isPostAvailable: InputState = this.isPostAvailable();
    const colorButtonAdd = isPostAvailable === InputState.TRUE ? 'success' : 'secondary';

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
          color="danger" 
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