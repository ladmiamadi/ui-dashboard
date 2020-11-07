import React from 'react';
import { Col, Row } from 'reactstrap';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { LANGUAGES_LEVEL } from '../../constants/language';

interface Props {
  userLanguages: UserLanguage[],
  updateUserLanguage: (property: string, value: string) => void,
}

export class UserLanguagesDisplay extends React.Component<Props> {
  render() {
    return (
      <>
        <Row form className="row-almost-large">
          {
            this.props.userLanguages.map(({ language, level }, index) =>
              (
                <Col key={index} md={6}>
                  <SelectFormField
                    key={index}
                    keyName={language}
                    label={language}
                    className="large almost-large"
                    options={LANGUAGES_LEVEL}
                    value={level}
                    handleChange={this.props.updateUserLanguage}
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