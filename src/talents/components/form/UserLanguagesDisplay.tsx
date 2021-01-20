import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { LANGUAGES_LEVEL } from '../../constants/language';
import { mapToOptionValues } from '../../helpers/FormHelper';
import { UpdateUserPayload } from '../../state/models/user-selected';

interface Props {
  userLanguages: UserLanguage[] | undefined,
  handleDeleteButtonClick: (index: number) => void,
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
                <Col className="col-flex" key={index} lg={6} md={8}>
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
                  <Button className="remove-language-button" type="button" color="danger" size="lg"
                    onClick={() => this.props.handleDeleteButtonClick(index)}>X
                  </Button>
                </Col>
              ),
            )
          }
        </Row>
      </>
    );
  }
}