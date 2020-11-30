import React from 'react';
import { User } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { COUNTRIES } from '../../constants/countries';
import { INTERN_OPTIONS } from '../../constants/internship-options';
import { PLACEMENT_OPTIONS } from '../../constants/placement-options';
import { UpdateUserPayload } from '../../state/models/user-selected';
import classes from './styles/TalentFormJob.module.css';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
}

export default class TalentFormJob extends React.Component<Props> {
  render() {
    const placementOptions = this.props.user.userDesiredJob?.placementOptions || null;
    const showInternOptions = placementOptions === 'Oui' || placementOptions === 'HDM-Network';
    const isHdmPlacement = placementOptions === 'HDM-Network';

    return (
      <div className={classes['job-section']}>
        <div className="form-title">
          <h6>Emploi désiré: </h6>
        </div>
        <SelectFormField
          keyName="placementOptions"
          className={classes['job-field']}
          label="Placement "
          options={PLACEMENT_OPTIONS}
          handleChange={(property, value) => this.props.modifyUser({
            category: 'userDesiredJob',
            property,
            value,
            index: -1,
          })}
          value={this.props.user.userDesiredJob?.placementOptions || ''} />
        {showInternOptions && (
          <div className={isHdmPlacement ? classes['job-hdmnetwork'] : ''}>
            <div className={classes['job-section-b']}>
              <SelectFormField
                keyName="internOptions"
                className={classes['job-field']}
                label="Actuellement en recherche: "
                options={INTERN_OPTIONS}
                handleChange={(property, value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property,
                  value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.internOptions || ''} />
              <FieldForm
                keyName="desiredJob"
                label="Métier souhaité: "
                className={classes['job-field']}
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property: 'desiredJob',
                  value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.desiredJob} />
              <FieldForm
                keyName="mobility"
                label="Mobilité: "
                className={classes['job-field']}
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property: 'mobility',
                  value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.mobility} />
              <SelectFormField
                keyName="desiredCountry"
                className={classes['job-field']}
                label="Pays souhaité: "
                options={COUNTRIES}
                handleChange={(property, value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property,
                  value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.desiredCountry || ''} />
              <FieldForm
                keyName="desiredCity"
                label="Ville souhaité: "
                className={classes['job-field']}
                type="text"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property: 'desiredCity',
                  value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.desiredCity} />
              <FieldForm
                keyName="currentSalary"
                label="Salaire actuel: "
                className={classes['job-field']}
                type="number"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property: 'currentSalary',
                  value: +value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.currentSalary} />
              <FieldForm
                keyName="desiredSalary"
                label="Salaire souhaité: "
                className={classes['job-field']}
                type="number"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property: 'desiredSalary',
                  value: +value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.desiredSalary} />
              <FieldForm
                keyName="jobDescription"
                label="Description: "
                className={classes['job-description']}
                rows={5}
                type="textarea"
                handleChange={(value) => this.props.modifyUser({
                  category: 'userDesiredJob',
                  property: 'jobDescription',
                  value,
                  index: -1,
                })}
                value={this.props.user.userDesiredJob?.jobDescription} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
