import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { RootDispatch, RootState } from '../../../app/state/store';
import { LANGUAGES_LEVEL } from '../../constants/language';
import { mapToOptionValues } from '../../helpers/FormHelper';
import { UserLanguageFactory } from '../../helpers/UserLanguageFactory';
import { UpdateLanguagePayload } from '../../state/models/languages/add-language';

interface Props {
  language: UserLanguage,
  languages: string[],
  updateLanguage: (payload: UpdateLanguagePayload) => void,
  addLanguageToSelectedUser: (userLanguage: UserLanguage) => void,
}

export class ModalLanguage extends React.Component<Props> {
  updateLanguageTest = (property: string, value: string) => {
    this.props.updateLanguage({ property, value });
  }

  render() {
    const newLanguage = UserLanguageFactory.createEmptyLanguage();

    return (
      <>
        <Row>
          <SelectFormField
            keyName="language"
            label="Ajouter une nouvelle langue : "
            options={mapToOptionValues(this.props.languages)}
            handleChange={this.updateLanguageTest}
            value={this.props.language.language}
          />
        </Row>
        {
          this.props.language.language !== newLanguage.language &&
          <Row className="d-flex">
            <SelectFormField
              label="Niveau : "
              keyName="level"
              options={mapToOptionValues(LANGUAGES_LEVEL)}
              handleChange={this.updateLanguageTest}
              value={this.props.language.level}
            />
          </Row>
        }
        {
          this.props.language.level !== newLanguage.level && (
            <Row>
              <Button
                className="form-add-button modal-button"
                color="default"
                onClick={() => this.props.addLanguageToSelectedUser(this.props.language)}
              >
                Ajouter une langue
              </Button>
            </Row>
          )
        }
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  language: state.addLanguage.language,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  addLanguageToSelectedUser: dispatch.addLanguage.addLanguageToSelectedUser,
  updateLanguage: dispatch.addLanguage.updateLanguage,
});

export default connect(mapState, mapDispatch)(ModalLanguage);