import React from 'react';
import AuthenticationInput from './AuthenticationInput';
import { arrayOfFormPropsConstructor } from '../formHelpers/formHelpers';
import { Button, Container, Form, Col, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { RootState, RootDispatch } from '../../app/state/store';
import { UserAuthenticationDto } from '../state/models/auth';
import classes from './styles/AuthenticationForm.module.css';

interface Props {
  isRequesting: boolean,
  login: (dto: UserAuthenticationDto) => Promise<void>,
}

export interface AuthenticationState {
  isFormValid: boolean,
  password: string,
  username: string,
}

export class AuthenticationForm extends React.Component<Props, AuthenticationState> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      isFormValid: false,
      password: '',
      username: '',
    };
    
  }

  isNotNull = (idValue: string): boolean => {
    if(idValue.length === 0){
      return false;
    }
  
    return true;
  }

  checkFormValidity = (newState: any): boolean => {
    const stateToCheck = {
      password: newState.password,
      username: newState.username,
    };
    let isFormValid: boolean = true;

    Object.entries(stateToCheck)
      .map((item) => {
        const idValue = item[1];

        isFormValid = isFormValid && this.isNotNull(idValue);

        return item;
      });

    return isFormValid;
  }
  
  handleClick = () => {
    this.props.login({
      password: this.state.password,
      username: this.state.username,
    });
  };

  handleOnChange = (id: string, idValue: string) => {
    const newState = { ...this.state } as any;

    newState[id] = idValue;

    const isFormValid: boolean = this.checkFormValidity(newState);
    
    newState.isFormValid = isFormValid;

    this.setState(newState);
  };

  render() {
    const arrayOfFormProps = arrayOfFormPropsConstructor(this.state);
    const isButtonEnabled = this.state.isFormValid && !this.props.isRequesting;
    const colorButton = isButtonEnabled ? 'primary' : 'secondary';
    const formContent = this.props.isRequesting ?

      <div className={classes.ContainerSpinner}>
        <Spinner color="primary" type="grow"/> 
      </div> :
      <Col>
        {arrayOfFormProps.map((props, index) => (
          <AuthenticationInput
            {...props}
            key={index}
            handleOnChange={this.handleOnChange}
          />
        ))}
      </Col>;

    return (
      <Container className={classes.ContainerAuthenticationForm}>
        <h1>Sign In</h1>
        <Form>
          { formContent }
          <Button 
            block 
            color={colorButton} 
            disabled={!isButtonEnabled} 
            onClick={this.handleClick} 
            size="lg" 
            type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapState = (state: RootState) => ({
  isRequesting: state.auth.isRequesting,
});

const mapDispatch = (dispatch: RootDispatch) => ({ 
  login: dispatch.auth.login, 
});

export default connect(mapState, mapDispatch)(AuthenticationForm);
