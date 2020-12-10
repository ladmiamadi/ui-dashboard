import React from 'react';
import { Col, Row } from 'reactstrap';
import { User, UserRecruitment } from '../../../app';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { RECRUITMENT_TRAY_OPTIONS } from '../../constants/recruitment-tray-options';
import { mapToOptionValues } from '../../helpers/FormHelper';
import { UpdateUserPayload } from '../../state/models/user-selected';

interface Props {
  user: User,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export default class TalentFormRecruitment extends React.Component<Props> {
  render() {
    const userRecruitment: UserRecruitment = this.props.user.userRecruitment;

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
                index: -1,
                category: 'userRecruitment',
                property: 'platform',
              })}
              value={userRecruitment?.platform || ''}
              required={true}
            />
          </Col>
          <Col md={6}>
            <SelectFormField
              keyName="mailboxHR"
              className="generic-field-form"
              label="Boîte e-mail: "
              options={mapToOptionValues(RECRUITMENT_TRAY_OPTIONS)}
              handleChange={(property, value) => this.props.modifyUser({
                category: 'userRecruitment',
                property,
                value,
                index: -1,
              })}
              value={userRecruitment?.mailboxHR || ''}
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
              type="textarea"
              handleChange={(value) => this.props.modifyUser({
                category: 'userRecruitment',
                property: 'recruitmentComments',
                value,
                index: -1,
              })}
              value={userRecruitment?.recruitmentComments || ''}
              required={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
