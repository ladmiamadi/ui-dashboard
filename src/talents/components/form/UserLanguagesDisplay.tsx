import React from 'react';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { Col, Row } from 'reactstrap';
import { LANGUAGES_LEVEL } from '../../constants/language';
import classes from './styles/TalentFormLanguage.module.css';

interface Props {
  userLanguages: UserLanguage[],
  updateUserLanguage: (property: string, value: string, index: number) => void,
}

export class UserLanguagesDisplay extends React.Component<Props> {
  render() {
    return (
      <>
        <Row form className={classes['form-language']}>
          {
            this.props.userLanguages.map(({ language, level }, index) =>
              (
                <Col key={index} md={4} sm={6}>
                  <SelectFormField
                    key={index}
                    keyName="level"
                    label={language}
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
