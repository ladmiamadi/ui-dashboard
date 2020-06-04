import React from 'react';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { Col } from 'reactstrap';

interface Props {
  userLanguages: UserLanguage[]
  options: string[]
}

export class UserLanguagesDisplay extends React.Component<Props> {
  render() {
    return (
      <>
        {
          this.props.userLanguages.map(({ language, level }, index) =>
            (
              <Col key={index} md={this.props.userLanguages.length - 1}>
                <SelectFormField
                  key={index}
                  keyName={'language-' + language}
                  label={language}
                  className="large"
                  options={this.props.options}
                  defaultValue={level}
                />
              </Col>
            ),
          )
        }
      </>
    );
  }
}