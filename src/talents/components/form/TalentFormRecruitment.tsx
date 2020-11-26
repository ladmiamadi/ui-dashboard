import React from 'react';
import { Col, Row } from 'reactstrap';
import { User, UserProfile } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { RECRUITMENT_TRAY_OPTIONS } from '../../constants/recruitment-tray-options';
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
          <Col md={6}>
            <FieldForm
              keyName="platform"
              label="Plateforme: "
              className="recruitment-field-form"
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
          <Col md={6}>
            <SelectFormField
              keyName="inbox"
              className="recruitment-field-form"
              label="Boîte e-mail: "
              options={RECRUITMENT_TRAY_OPTIONS}
              handleChange={(property, value) => this.props.modifyUser({
                category: 'userRecruitment',
                property,
                value,
                index: -1,
              })}
              value={userProfileLive?.recruitmentTray || ''}
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FieldForm
              keyName="recruitmentComments"
              label="Commentaires sur le recrutement: "
              className="recruitment-field-form"
              rows={5}
              type="textarea"
              handleChange={(value) => this.props.modifyUser({
                category: 'userRecruitment',
                property: 'recruitmentComments',
                value,
                index: -1,
              })}
              value={userProfileLive?.recruitmentComments}
              required={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
