import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { RootDispatch, RootState } from '../../../app/state/store';
import { UserLanguage } from '../../../app/index';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UpdateLanguagePayload } from './state/models/languages/addLanguage';

interface Props {
  optionsLevelLanguage: string[],
  language: UserLanguage,
  resetLanguage: () => void,
  updateLanguage: (payload:UpdateLanguagePayload) => void,
  optionLanguage: string[],
  isPosting: boolean,
  postLanguage: (userLanguage: UserLanguage) => void,
}

export class ModalLanguage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.resetLanguage();
  }

  updateLanguageTest = (property:string, value:string) => {
    const payload = {
      property: property,
      value: value,
    };

    this.props.updateLanguage(payload);
  }

  postLanguageAndLeaveModal = async() => {
    this.props.postLanguage(this.props.language);
  }

  render() {
    return (
      <>
        <Row>
          <SelectFormField
            keyName="language"
            label="Ajouter une nouvelle langue : "
            options={this.props.optionLanguage}
            updateModel={this.updateLanguageTest}
          />
        </Row>
        { this.props.language.language !== '' &&
          <Row className="d-flex">
            <SelectFormField
              label="Niveau : "
              keyName="level"
              options={this.props.optionsLevelLanguage}
              updateModel={this.updateLanguageTest}
            />
          </Row>
        }
        {
          this.props.language.level !== '' &&
            <Row>
              <Button
                className="form-add-button modal-button"
                color="default"
                onClick={this.postLanguageAndLeaveModal}
                disabled={this.props.isPosting}> Ajouter une langue </Button>
            </Row>
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
