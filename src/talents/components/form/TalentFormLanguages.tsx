import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { RootDispatch, RootState } from '../../../app/state/store';
import ModalLanguage from './ModalLanguage';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { UserLanguage } from '../../../app';
import { UserLanguagesDisplay } from './UserLanguagesDisplay';
import { LANGUAGES, LANGUAGES_LEVEL } from '../../index.d';

interface Props {
  fetchLanguages: () => Promise<void>,
  userLanguages: UserLanguage[],
  updateUserLanguages: (language: UserLanguage) => void,
}

interface State {
  isModalShown: boolean,
  optionsLevelLanguage: string[],
  optionLanguage: string[],
}

export class TalentFormLanguages extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
      optionsLevelLanguage: LANGUAGES_LEVEL,
      optionLanguage: LANGUAGES,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.userLanguages.length !== prevProps.userLanguages.length) {
      const userLanguages = this.props.userLanguages.map(({ language }) => (language));

      this.setState({
        optionLanguage: this.state.optionLanguage
          .filter((language) => userLanguages.indexOf(language) === -1),
      });
    }
  }

  componentDidMount = async() => {
    await this.props.fetchLanguages();
  }

  toggleModal = () => this.setState({ isModalShown: !this.state.isModalShown });

  updateUserLanguages = (property: string, value: string) => {
    this.props.updateUserLanguages({ language: property, level: value });
  }

  render() {
    return (
      <div className="form-section almost-large">
        <div className="section-add">
          <h6>Langues: </h6>
          <Button onClick={this.toggleModal} className="form-add-button" color="default">Ajouter une langue</Button>
        </div>
        <UserLanguagesDisplay
          userLanguages={this.props.userLanguages}
          selectFormFieldOptions={this.state.optionsLevelLanguage}
          updateUserLanguages={this.updateUserLanguages}
        />
        <ModalCustom
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModal}
          titleModal="Ajouter une langue"
        >
          <ModalLanguage
            optionsLevelLanguage={this.state.optionsLevelLanguage}
            optionLanguage={this.state.optionLanguage}
          />
        </ModalCustom>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  userLanguages: state.userLanguages.languages,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchLanguages: dispatch.userLanguages.fetchLanguages,
  updateUserLanguages: dispatch.userLanguages.updateUserLanguages,
});

export default connect(mapState, mapDispatch)(TalentFormLanguages);
