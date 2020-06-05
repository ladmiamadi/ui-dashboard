import React from 'react';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { Col, Row } from 'reactstrap';

interface Props {
  userLanguages: UserLanguage[],
  options: string[],
  updateUserLanguages: (property: string, value: string) => void,
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
                    options={this.props.options}
                    value={level}
                    handleOnChange={this.props.updateUserLanguages}
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