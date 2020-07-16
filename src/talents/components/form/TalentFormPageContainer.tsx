import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { User } from '../../../app';
import { RootState, RootDispatch } from '../../../app/state/store';
import TalentFormHead from './TalentFormHead';
import TalentFormAddress from './TalentFormAddress';
import TalentFormInstitution  from './TalentFormInstitution';
import TalentFormInternship from './TalentFormInternship';
import TalentFormExperience from './TalentFormExperience';
import TalentFormFormation from './TalentFormFormation';
import TalentFormJob from './TalentFormJob';
import TalentFormLanguages from './TalentFormLanguages';
import TalentFormSkills from './TalentFormSkills';
import { UpdateUserPayload } from '../../state/models/userSelected';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export class TalentFormPageContainer extends React.Component<Props> {
  render() {
    if (this.props.user.userExperiences) {
      //console.log(this.props.user.userExperiences[0].startDate + typeof this.props.user.userExperiences[0].startDate);
      console.log('typof created date : ' + typeof this.props.user.createdDate + this.props.user.createdDate);
      const testDate = new Date;
      console.log('typeOf new date : ' + typeof testDate + testDate);
    }
    return (
      <div className="talent-form-page">
        <Container>
          <form className="talent-form">
            <TalentFormHead {...this.props} />
            <TalentFormAddress {...this.props} />
            <TalentFormInstitution {...this.props} />
            <TalentFormInternship {...this.props} />
            <TalentFormJob {...this.props} />
            <TalentFormSkills />
            <TalentFormLanguages {...this.props} />
            <TalentFormFormation {...this.props} />
            <TalentFormExperience {...this.props} />
            <button type="submit" className="form-button">Sauvegarder les changements</button>
          </form>
        </Container>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.userSelected.userSelected,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.userSelected.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormPageContainer);
