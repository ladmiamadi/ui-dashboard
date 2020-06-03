import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import React from 'react';
import './styles/AuthenticationForm.css';

interface Props {
  login: (dto: { username: string; email: string; password: string }) => Promise<void>;
}

interface State {
  username: string;
  email: string;
  password: string;
}

export class AuthenticationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: 'Quentin',
      email: '',
      password: '',
    };
  }

  handleClick = async () => {
    await this.props.login({
      // username: this.state.email,
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
    return (
      <div className="login">
        <Container>
          <h1>Connexion à l'espace admin</h1>
          <Form>
            <FormGroup>
              <Label for="Select">
                <span>* </span>Select your username
              </Label>
              <Input
                type="select"
                defaultValue={this.state.username}
                onChange={(event) => this.handleOnChange('username', event.target.value)}
                name="username"
                id="username"
              >
                <option>Quentin</option>
                <option>David</option>
                <option>Antonio</option>
                <option>Guest</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Email">
                <span>* </span>Email
              </Label>
              <Input
                type="email"
                onChange={(event) => this.handleOnChange('email', event.target.value)}
                name="email"
                id="email"
                placeholder="Type your email..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">
                <span>* </span>Password
              </Label>
              <Input
                type="password"
                onChange={(event) => this.handleOnChange('password', event.target.value)}
                value={this.state.password}
                name="password"
                id="password"
                placeholder="Enter your password..."
              />
            </FormGroup>
            <Button className="Submit" onClick={this.handleClick}>
              Connexion
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapDispatch = (dispatch: any) => ({ login: dispatch.auth.login });

export default connect(() => ({}), mapDispatch)(AuthenticationForm);
