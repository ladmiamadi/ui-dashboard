import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { FieldForm } from '../../../app/components/utils/FieldForm';
import { RootDispatch, RootState } from '../../../app/state/store';
import { User, UserExperience } from '../../../app/index';
import { UserExperienceFactory } from '../../helpers/UserExperienceFactory';
import { UpdateExperiencePayload } from '../../state/models/experiences/addExperience';

interface Props {
  userSelected: User,
  experience: UserExperience,
  //languages: string[],
  //isPosting: boolean,
  resetExperience: () => void,
  updateExperience: (payload: UpdateExperiencePayload) => void,
  //postLanguage: (userLanguage: UserLanguage) => void,
}

export class ModalExperience extends React.Component<Props> {
  updateExperience = (value: string) => {
    this.props.updateExperience({ value });
  }

  render() {
    const newExperience = UserExperienceFactory.createEmptyExperience();

    return (
      <>
        <Row>
          <FieldForm
            keyName="company"
            label="company : "
            type="text"
            handleChange={this.updateExperience}
            value={this.props.experience.company}
          />
        </Row>
        {/* {
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
                onClick={() => this.props.postLanguage(this.props.language)}
                disabled={this.props.isPosting}
              >
                Ajouter une langue
              </Button>
            </Row>*/}
          )
        }
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  experience: state.addExperience.experience,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateExperience: dispatch.addExperience.updateExperience,
  resetExperience: dispatch.addExperience.resetExperience,
});

export default connect(mapState, mapDispatch)(ModalExperience);
