import React from 'react';
import { Col, Row } from 'reactstrap';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { LANGUAGES_LEVEL } from '../../constants/language';
import { mapToOptionValues } from '../../helpers/FormHelper';
import { UpdateUserPayload } from '../../state/models/user-selected';

interface Props {
  userLanguages: UserLanguage[] | undefined,
  modifyUser: (payload: UpdateUserPayload) => void,
}

export class UserLanguagesDisplay extends React.Component<Props> {
  render() {
    return (
      <>
        <Row form className="row-almost-large">
          {
            this.props.userLanguages?.map(({ language, level }, index) =>
              (
                <Col key={index} lg={6} md={8}>
                  <SelectFormField
                    key={index}
                    keyName={language}
                    label={language}
                    className="large almost-large"
                    options={mapToOptionValues(LANGUAGES_LEVEL)}
                    value={level}
                    handleChange={(property, value) => this.props.modifyUser( {
                      category: 'userLanguages',
                      property: 'level',
                      value,
                      index,
                    },
                    )}
                  />
                </Col>
              ),
            )
          }
        </Row>
      </>
    );
  }
}