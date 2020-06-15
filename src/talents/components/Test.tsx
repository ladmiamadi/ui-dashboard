import React from 'react';
import { User } from '../../app';
import { RouteComponentProps } from 'react-router-dom';
import { user } from '../../app/state/models/user';
import { users } from '../state/models/users';

interface Props extends RouteComponentProps {
  user: User;
}

export class Test extends React.Component<Props>{
  render(){
    console.log('test', this.props.location.state);
    return(
      <div>Vous avez été correctement redirigé sur la page de l'user + {} </div>);
  }
}
