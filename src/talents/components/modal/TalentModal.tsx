import React from 'react';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { User } from '../../../app';

interface Props {
  talent: User,
}

interface State {
  redirect: string,
}
export class TalentModal extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { redirect: '' };
  }

  redirect = () => {
    this.setState({ redirect: '/editprofile' });
  }
  
  render() {
    if (this.state.redirect !== ''){
      return <Redirect
        to={{ pathname: this.state.redirect }} />;
    }
    return(
      <Router>
        <>
          Une demande de modification est en cours pour ce talent,
           veuillez faire le neccessaire avant de consulter la fiche.
          <br></br>
          <Button onClick ={this.redirect}>Ok</Button>
        </>
      </Router>
    );
  }
}
