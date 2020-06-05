import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { User } from '../../../app';
import { RootDispatch, RootState } from '../../../app/state/store';
import TalentFormHead from './TalentFormHead';
import TalentFormAddress from './TalentFormAddress';
import TalentFormInstitution  from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';

interface Props {
  talent: User,
  fetchUserById: (id: number) => Promise<void>,
  isfetching: boolean,
}

export class TalenFormPageContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.fetchUserById(1);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    /*   console.log(event);*/
  }

  render() {
    if(this.props.isfetching) {
      return <div><p>En attente du Loader</p></div>;
    }

    return (
      <div className="talent-form-page">
        <Container>
          <form className="talent-form" onSubmit={this.handleSubmit}>
            <TalentFormHead />
            <TalentFormAddress />
            <TalentFormInstitution  />
            <TalentFormInternship />
            <TalentFormJob />
            <TalentFormSkills />
            <TalentFormLanguages />
            <TalentFormFormation />
            <TalentFormExperience />
            <button type="submit" className="form-button">Sauvegarder les changements</button>
          </form>
        </Container>
      </div> );
  }
}

const mapState = (state: RootState) => ({
  talent: state.user.user,
  isfetching: state.user.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchUserById: dispatch.user.fetchUserById,
});

export default connect(mapState, mapDispatch)(TalenFormPageContainer);
