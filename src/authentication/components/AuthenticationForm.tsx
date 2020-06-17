import React from 'react';
import { Button, Container, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { arrayOfFormPropsConstructor } from '../formHelpers/formHelpers';
import AuthenticationInput from './AuthenticationInput';
import { UserAuthenticationDto } from '../state/models/auth';
import classes from './styles/AuthenticationForm.module.css';

interface Props {
  login: (dto: UserAuthenticationDto) => Promise<void>,
}

interface State {
  password: string,
  username: string,
}

export class AuthenticationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      password: '',
      username: '',
    };
    
  }
  
  handleClick = async () => {
    await this.props.login({
      password: this.state.password,
      username: this.state.username,
    });
  };

  handleOnChange = (id: string, idValue: string) => {
    const state = { ...this.state } as any;
    state[id] = idValue;
    this.setState(state);
  };

  render() {
    const arrayOfFormProps = arrayOfFormPropsConstructor();

    return (
      <Container className={classes.ContainerAuthenticationForm}>
        <h1>Connexion à l'espace admin</h1>
        <Form>
          <Row>
            {arrayOfFormProps.map((props, index) => (
              <AuthenticationInput
                {...props}
                key={index}
                handleOnChange={this.handleOnChange}
              />
            ))}
          </Row>
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
