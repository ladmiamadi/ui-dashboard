import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UserLanguage } from '../../../app/index';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UpdateLanguagePayload } from './state/models/languages/addLanguage';
import { UserLanguageFactory } from './helpers/UserLanguageFactory';

interface Props {
  language: UserLanguage,
  optionLanguage: string[],
  optionsLevelLanguage: string[],
  isPosting: boolean,
  isFetching: boolean,
  resetLanguage: () => void,
  updateLanguage: (payload: UpdateLanguagePayload) => void,
  postLanguage: (userLanguage: UserLanguage) => void,
}

export class ModalLanguage extends React.Component<Props> {
  updateLanguageTest = (property: string, value: string) => {
    this.props.updateLanguage({ property, value });
  }

  postLanguage = async() => {
    this.props.postLanguage(this.props.language);
  }

  render() {
    const newLanguage = UserLanguageFactory.createEmptyLanguage();

    return (
      <>
        <Row>
          <SelectFormField
            keyName="language"
            label="Ajouter une nouvelle langue : "
            options={this.props.optionLanguage}
            handleOnChange={this.updateLanguageTest}
            value={this.props.language.language}
          />
        </Row>
        {
          this.props.language.language !== newLanguage.language &&
          <Row className="d-flex">
            <SelectFormField
              label="Niveau : "
              keyName="level"
              options={this.props.optionsLevelLanguage}
              handleOnChange={this.updateLanguageTest}
              value={this.props.language.level}
            />
          </Row>
        }
        {
          this.props.language.level !== newLanguage.level &&
            <Row>
              <Button
                className="form-add-button modal-button"
                color="default"
                onClick={this.postLanguage}
                disabled={this.props.isPosting || this.props.isFetching}
              >
                Ajouter une langue
              </Button>
            </Row>
        }
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  language: state.addLanguage.language,
  isPosting: state.addLanguage.isPosting,
  isFetching: state.userLanguages.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  postLanguage: dispatch.addLanguage.postLanguage,
  resetLanguage: dispatch.addLanguage.resetLanguage,
  updateLanguage: dispatch.addLanguage.updateLanguage,

});

export default connect(mapState, mapDispatch)(ModalLanguage);
