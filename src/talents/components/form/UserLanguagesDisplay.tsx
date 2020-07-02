import React from 'react';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { Col, Row } from 'reactstrap';
import { LANGUAGES_LEVEL } from '../../constants/language';

interface Props {
  userLanguages: UserLanguage[],
  updateUserLanguage: (property: string, value: string, index: number) => void,
}

export class UserLanguagesDisplay extends React.Component<Props> {
  render() {
    console.log(this.props.userLanguages);
    return (
      <>
        <Row form className="row-almost-large">
          {
            this.props.userLanguages.map(({ language, level }, index) =>
              (
                <Col key={index} md={6}>
                  <SelectFormField
                    key={index}
                    keyName="level"
                    label={language}
                    className="large almost-large"
                    options={LANGUAGES_LEVEL}
                    value={level}
                    handleChange={(property, value) => this.props.updateUserLanguage(property, value, index)}
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
