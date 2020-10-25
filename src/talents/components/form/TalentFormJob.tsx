import React from 'react';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ProfileCollection from '../../helpers/ProfileCollection';
import classes from './styles/TalentFormJob.module.css';
import { COUNTRIES } from '../../constants/countries';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormJob extends React.Component<Props> {
  render() {
    const indexWorking: number = ProfileCollection.findWorkingIndex(this.props.user.userProfiles);
    const userProfileWorking: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles,
      'working',
    );

    return (
      <div className={classes['job-section']}>
        <FieldForm
          //className="large"
          keyName="job-desired"
          label="Métier souhaité: "
          className={classes['job-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'desiredJob',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.desiredJob} />
        <FieldForm
          //className="large"
          keyName="job-mobility"
          label="Mobilité: "
          className={classes['job-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'mobility',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.mobility} />
        <SelectFormField
          keyName="countryDesiredJob"
          className={classes['job-field']}
          label="Pays souhaité: "
          options={COUNTRIES}
          handleChange={(property, value) => this.props.modifyUser({
            category: 'userProfiles',
            property,
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.countryDesiredJob || ''} />
        <FieldForm
          keyName="job-city"
          label="Ville souhaité: "
          className={classes['job-field']}
          type="text"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'desiredCity',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.cityDesiredJob} />
        <FieldForm
          keyName="job-actual-pay"
          label="Salaire actuel: "
          className={classes['job-field']}
          type="number"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'actualSalary',
            value: +value,
            index: indexWorking,
          })}
          value={userProfileWorking?.actualSalary} />
        <FieldForm
          //className="medium"
          keyName="job-desired-pay"
          label="Salaire souhaité: "
          className={classes['job-field']}
          type="number"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'expectedSalary',
            value: +value,
            index: indexWorking,
          })}
          value={userProfileWorking?.expectedSalary} />
        <FieldForm
          keyName="job-description"
          label="Description: "
          className={classes['job-description']}
          rows={5}
          type="textarea"
          handleChange={(value) => this.props.modifyUser({
            category: 'userProfiles',
            property: 'descriptionInFrench',
            value,
            index: indexWorking,
          })}
          value={userProfileWorking?.descriptionInFrench} />
      </div>
    );
  }
}
