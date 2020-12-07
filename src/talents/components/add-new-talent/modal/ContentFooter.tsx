import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Job, User } from '../../../../app';
import history from '../../../../app/helpers/history';
import { RootDispatch, RootState } from '../../../../app/state/store';
import { FormValidator } from '../../../helpers/FormValidator';
import { createDtoUserIntern } from '../../../helpers/UserFactoryHelper';
import { IsFormValid, UserSignUp } from '../../../index.d';
interface Props {
  isFormValid: IsFormValid,
  isRequesting: boolean,
  jobCollection: Job[],
  userSignUp: UserSignUp,
  defaultRecruiterUser: User,
  postUserInDb: (userSentInDb: User, redirect: boolean) => Promise<User | null>,
  resetUserSignUp: () => void,
  toggleModal: () => void,
  updateUserSelected: (userSelected: User) => void,
}

export class ContentModalFooter extends React.Component<Props> {
  isPostAvailable = (): boolean => {
    return this.props.isRequesting ? false : FormValidator.isAllFieldValidated<IsFormValid>(this.props.isFormValid);
  }

  postUserInDb = async (redirect: boolean) => {
    const userSentInDb = createDtoUserIntern(
      this.props.userSignUp,
      this.props.jobCollection,
      this.props.defaultRecruiterUser,
    );

    const newUser = await this.props.postUserInDb(userSentInDb, redirect);
    if (newUser != null && redirect) {
      this.props.updateUserSelected(_.cloneDeep(newUser));
      history.push('/talent');
    }
  }

  render() {
    const isPostAvailable = this.isPostAvailable();
    
    const colorButtonAdd = isPostAvailable ? 'success' : 'secondary';

    return (
      <>
        <Button
          color={colorButtonAdd}
          disabled={!isPostAvailable}
          onClick={() => this.postUserInDb(true)}>
          Ajouter et Editer
        </Button>
        <Button
          color={colorButtonAdd}
          disabled={!isPostAvailable}
          onClick={() => this.postUserInDb(false)}>
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
  defaultRecruiterUser: state.userSignUp.defaultRecruiterUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  postUserInDb: dispatch.userSignUp.postUserInDb,
  resetUserSignUp: dispatch.userSignUp.resetUserSignUp,
  updateUserSelected: dispatch.userSelected.updateUserSelected,
});

export default connect(mapState, mapDispatch)(ContentModalFooter);