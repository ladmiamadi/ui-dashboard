import React from 'react';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { User } from '../../../app';
import '../styles/TalentsList.css';

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
    if (this.state.redirect !== '') {
      return <Redirect
        to={{ pathname: this.state.redirect }} />;
    }

    return(
      <Router>
        <>
          <div className="talent-modal-content">
            Une demande de modification est en cours pour ce talent,
            veuillez faire le néccessaire avant de consulter la fiche.
          </div>
          <br/>
          <Button className="button-talent-modal" onClick={this.redirect}>Ok</Button>
        </>
      </Router>
    );
  }
}
