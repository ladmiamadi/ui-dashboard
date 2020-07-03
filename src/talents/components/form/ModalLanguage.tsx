import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { RootDispatch, RootState } from '../../../app/state/store';
import { User, UserLanguage } from '../../../app/index';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UpdateLanguagePayload } from '../../state/models/languages/add-language';
import { UserLanguageFactory } from '../../helpers/UserLanguageFactory';
import { LANGUAGES_LEVEL } from '../../constants/language';

interface Props {
  userSelected: User,
  language: UserLanguage,
  languages: string[],
  isPosting: boolean,
  resetLanguage: () => void,
  updateLanguage: (payload: UpdateLanguagePayload) => void,
  postLanguage: (userLanguage: UserLanguage, user: User) => void,
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
            options={this.props.languages}
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
              options={LANGUAGES_LEVEL}
              handleChange={this.updateLanguageTest}
              value={this.props.language.level}
            />
          </Row>
        }
        {
          this.props.language.level !== newLanguage.level
          && (
            <Row>
              <Button
                className="form-add-button modal-button"
                color="default"
                onClick={() => this.props.postLanguage(this.props.language, { ...this.props.userSelected })}
                disabled={this.props.isPosting}
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
  isPosting: state.addLanguage.isPosting,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  postLanguage: dispatch.addLanguage.postLanguage,
  resetLanguage: dispatch.addLanguage.resetLanguage,
  updateLanguage: dispatch.addLanguage.updateLanguage,

});

export default connect(mapState, mapDispatch)(ModalLanguage);
