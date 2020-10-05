import React from 'react';
import { connect } from 'react-redux';
import { User, UserProfile } from '../../../app';
import { FieldForm }  from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UpdateUserPayload } from '../../state/models/user';
import ProfileCollection from '../../helpers/ProfileCollection';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export class TalentFormJob extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 
      'working',
    );

    return (
      <div className="form-section">
        <FieldForm
          className="large"
          keyName="job-desired"
          label="Métier souhaité: "
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'desiredJob',
            value: value,
            index: indexWorking,
          })}
          value={userProfileWorking?.desiredJob} />
        <FieldForm
          className="large"
          keyName="job-mobility"
          label="Mobilité: "
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'mobility',
            value: value,
            index: indexWorking,
          })}          
          value={userProfileWorking?.mobility} />
        <FieldForm
          className="large"
          keyName="job-description"
          label="Description: "
          rows={5}
          type="textarea"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'descriptionInFrench',
            value: value,
            index: indexWorking,
          })}          
          value={userProfileWorking?.descriptionInFrench} />
        <FieldForm
          className="medium"
          keyName="job-actual-pay"
          label="Salaire actuel: "
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'actualSalary',
            value: value,
            index: indexWorking,
          })}          
          value={userProfileWorking?.actualSalary} />
        <FieldForm
          className="medium"
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'expectedSalary',
            value: value,
            index: indexWorking,
          })}          
          value={userProfileWorking?.expectedSalary} />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormJob);

