import React, { Component } from 'react';
import InputDateRegisterUser from './inputs/InputDateRegisterUser';
import InputRegisterUser from './inputs/InputRegisterUser';
import InputSelectRegisterUser from './inputs/InputSelectRegisterUser';
import { arrayOptionsPosition } from '..';
import { Row } from 'reactstrap';
import { UserSignUp, IsFormValid } from '../../../state/models/userSignUp';
import classes from '../../styles/FormRegisterUser.module.css';

interface Props {
  isFormValid: IsFormValid,
  listUserUsername: string[],
  userSignUp: UserSignUp,
  updateUserSignUp: (id: string, payload: string) => void,
  setIsFormValid: (id: string, payload: boolean) => void,
}

export default class FormRegisterUser extends Component<Props> {
  render() {
    return (
      <>
        <Row className={classes.RowFormRegisterUser}>
          <InputRegisterUser
            id="firstName"
            isInputValid={this.props.isFormValid.firstName}
            idValue={this.props.userSignUp.firstName}
            label="Prénom"
            regEx="."
            type="text"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
          <InputRegisterUser
            id="lastName"
            isInputValid={this.props.isFormValid.lastName}
            idValue={this.props.userSignUp.lastName}
            label="Nom"
            regEx="."
            type="text"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
        <Row className={classes.RowFormRegisterUser}>
          <InputRegisterUser
            id="country"
            isInputValid={this.props.isFormValid.country}
            idValue={this.props.userSignUp.country}
            label="Pays"
            regEx="."
            type="text"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
          <InputRegisterUser
            id="phone"
            isInputValid={this.props.isFormValid.phone}
            idValue={this.props.userSignUp.phone}
            label="Téléphone"
            regEx="^[0-9]*$"
            type="text"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
        <Row className={classes.RowFormRegisterUser}>
          <InputSelectRegisterUser 
            id="desiredJob"
            isInputValid={this.props.isFormValid.desiredJob}
            idValue={this.props.userSignUp.desiredJob}
            label="Fonction"
            options={arrayOptionsPosition}
            regEx="."
            type="select"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}          
          />
          <InputDateRegisterUser
            id="birthDate"
            isInputValid={this.props.isFormValid.birthDate}
            idValue={this.props.userSignUp.birthDate}
            label="Date de naissance"
            regEx="^\d{4}-\d{2}-\d{2}$"
            type="date"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
        <Row className={classes.RowFormRegisterUser}>
          <InputRegisterUser
            id="mailInstitution"
            isInputValid={this.props.isFormValid.mailInstitution}
            idValue={this.props.userSignUp.mailInstitution}
            label="Email"
            listUserUsername={this.props.listUserUsername}
            // eslint-disable-next-line max-len
            regEx="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            type="email"
            updateUserSignUp={this.props.updateUserSignUp}
            setIsFormValid={this.props.setIsFormValid}
          />
        </Row>
      </>
    );
  }
}

