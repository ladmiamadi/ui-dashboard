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
    const indexLive: number = ProfileCollection.findLiveIndex(this.props.user.userProfiles);
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
              className="generic-field-form"
              type="text"
              handleChange={(value) => this.props.modifyUser({
                value,
                index: indexLive,
                category: 'userProfiles',
                property: 'platform',
              })}
              value={userProfileLive?.platform || ''}
              required={true}
            />
          </Col>
          <Col md={6}>
            <SelectFormField
              keyName="mailboxHR"
              className="generic-field-form"
              label="Boîte e-mail: "
              options={RECRUITMENT_TRAY_OPTIONS}
              handleChange={(property, value) => this.props.modifyUser({
                category: 'userProfiles',
                property,
                value,
                index: indexLive,
              })}
              value={userProfileLive?.mailboxHR || ''}
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FieldForm
              keyName="recruitmentComments"
              label="Commentaires sur le recrutement: "
              className="generic-field-form"
              rows={5}
              type="textarea"
              handleChange={(value) => this.props.modifyUser({
                category: 'userProfiles',
                property: 'recruitmentComments',
                value,
                index: indexLive,
              })}
              value={userProfileLive?.recruitmentComments || ''}
              required={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
