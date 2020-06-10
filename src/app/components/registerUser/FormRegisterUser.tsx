import React, { Component } from 'react';
import { Row } from 'reactstrap';
import InputRegisterUser from './InputRegisterUser';
import { arrayOptionsPosition } from './';
import classes from '../styles/FormRegisterUser.module.css';
import { UserSignUp, IsFormValid } from '../../state/models/userSignUp';
import InputSelectRegisterUser from './InputSelectRegisterUser';
import InputDateRegisterUser from './InputDateRegisterUser';

interface Props {
  userSignUp: UserSignUp,
  listUserUsername: string[],
  isFormValid: IsFormValid,
  updateUserSignUp: (id: string, payload: string) => void,
  setIsFormValid: (id: string, payload: boolean) => void,
}
interface State {
  
}

export default class FormRegisterUser extends Component<Props, State> {
  render() {
    return (
      <>
        <Row className={classes.RowFormRegisterUser}>
          <InputRegisterUser
            id="firstName"
            idValue={this.props.userSignUp.firstName}
            type="text"
            label="Prénom"
            regEx="."
            isInputValid={this.props.isFormValid.firstName}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
          <InputRegisterUser
            id="lastName"
            idValue={this.props.userSignUp.lastName}
            type="text"
            label="Nom"
            regEx="."
            isInputValid={this.props.isFormValid.lastName}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
        <Row className={classes.RowFormRegisterUser}>
          <InputRegisterUser
            id="country"
            idValue={this.props.userSignUp.country}
            type="text"
            label="Pays"
            regEx="."
            isInputValid={this.props.isFormValid.country}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
          <InputRegisterUser
            id="phone"
            idValue={this.props.userSignUp.phone}
            type="text"
            label="Téléphone"
            regEx="^[0-9]*$"
            isInputValid={this.props.isFormValid.phone}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
        <Row className={classes.RowFormRegisterUser}>
          <InputSelectRegisterUser 
            id="desiredJob"
            idValue={this.props.userSignUp.desiredJob}
            type="select"
            label="Fonction"
            options={arrayOptionsPosition}
            regEx="."
            isInputValid={this.props.isFormValid.desiredJob}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}          
          />
          <InputDateRegisterUser
            id="birthDate"
            idValue={this.props.userSignUp.birthDate}
            type="date"
            label="Date de naissance"
            regEx="^\d{4}-\d{2}-\d{2}$"
            isInputValid={this.props.isFormValid.birthDate}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
        <Row className={classes.RowFormRegisterUser}>
          <InputRegisterUser
            id="mailInstitution"
            idValue={this.props.userSignUp.mailInstitution}
            type="email"
            label="Email"
            // eslint-disable-next-line max-len
            regEx="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            isInputValid={this.props.isFormValid.mailInstitution}
            listUserUsername={this.props.listUserUsername}
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
      </>
    );
  }
}

