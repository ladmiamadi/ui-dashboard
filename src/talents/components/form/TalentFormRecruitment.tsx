import React from 'react';
import { Col, Row } from 'reactstrap';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { RECRUITMENT_OPTIONS } from '../../constants/recruitment-options';
import ProfileCollection from '../../helpers/ProfileCollection';
import { UpdateUserPayload } from '../../state/models/user-selected';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export default class TalentFormRecruitment extends React.Component<Props> {
  render() {
    const userProfileLive: UserProfile | undefined = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'live',
    );

    return (
      <div className="recruitment-section">
        <div className="form-title">
          <h6>Recrutement: </h6>
        </div>
        <Row>
          <Col>
            <FieldForm
              keyName="platform"
              label="Plateforme: "
              className="address-field-form"
              type="text"
              handleChange={(value) => this.props.modifyUser({
                value,
                index: -1,
                category: 'userRecruitment',
                property: 'platform',
              })}
              value={userProfileLive?.platform}
              required={true}
            />
          </Col>
          <Col>
            <SelectFormField
              keyName="inbox"
              className="address-field-form"
              label="Boîte e-mail: "
              options={RECRUITMENT_OPTIONS}
              handleChange={(property, value) => this.props.modifyUser({
                category: 'userRecruitment',
                property,
                value,
                index: -1,
              })}
              value={this.props.user.userAddress?.country || ''}
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FieldForm
              keyName="recruitmentComments"
              label="Commentaires sur le recrutement: "
              className="address-field-form"
              rows={5}
              type="textarea"
              handleChange={(value) => this.props.modifyUser({
                category: 'userRecruitment',
                property: 'recruitmentComments',
                value,
                index: -1,
              })}
              value={this.props.user.userDesiredJob?.jobDescription}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
