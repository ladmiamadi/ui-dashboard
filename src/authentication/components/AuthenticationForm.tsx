import React from 'react';
import { Button, Container, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { doubleArrayOfFormPropsConstructor } from '../formHelpers/fromHelpers';
import AuthenticationInput from './AuthenticationInput';
import classes from './styles/AuthenticationForm.module.css';

interface Props {
  login: (dto: { username: string; email: string; password: string }) => Promise<void>,
}

interface State {
  email: string,
  password: string,
  username: string,
}

export class AuthenticationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      username: '',
    };
    
  }
  
  handleClick = async () => {
    await this.props.login({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });
  };

  handleOnChange = (field: 'username' | 'email' | 'password', value: string) => {
    const state: State = { ...this.state };
    state[field] = value;
    this.setState(state);
  };

  render() {
    const doubleArrayOfFormProps = doubleArrayOfFormPropsConstructor();

    return (
      <Container className={classes.ContainerAuthenticationForm}>
        <h1>Connexion à l'espace admin</h1>
        <Form>
          {
            doubleArrayOfFormProps.map((array, index) => (
              <Row key={index}>
                {array.map((props, index) => (
                  <AuthenticationInput
                    {...props}
                    key={index}
                    handleOnChange={this.handleOnChange}
                  />
                ))}
              </Row>
            ))
          }
          <Button color="success" size="lg" block onClick={this.handleClick}>
              Connexion
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = (dispatch: any) => ({ login: dispatch.auth.login });

export default connect(() => ({}), mapDispatch)(AuthenticationForm);
