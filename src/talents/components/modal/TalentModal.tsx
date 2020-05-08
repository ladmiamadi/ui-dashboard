import React from 'react';
import { Button } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import history  from '../../../app/components/history';
import { Talent } from '../..';

interface Props {
  talent: Talent,
}

export class TalentModal extends React.Component <Props> {

  redirect = () => {
    history.push({
    pathname: '/test',
    state: {userId : this.props.talent.id}});
  }
  
  render() {
    return(
      <Router>
        <>
          Une demande de modification est en cours pour ce talent,
           veuillez faire le neccessaire avant de consulter la fiche.
          <br></br>
          <Button onClick ={ this.redirect }>Ok</Button>
        </>
      </Router>
    );
  }
}