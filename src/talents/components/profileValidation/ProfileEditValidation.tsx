import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { RootState } from '../../../app/state/store';

interface Props {
  user: User,
}

export class ProfileEditValidation extends React.Component<Props> {

  render(){
    return(
      <div>Vous avez été correctement redirigé sur la page de validation l'user {this.props.user.username} </div>);
  }
}

const mapState = (state: RootState) => ({
  user: state.users.user,
});

export default connect(mapState)(ProfileEditValidation);
