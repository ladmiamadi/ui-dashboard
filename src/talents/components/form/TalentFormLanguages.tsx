import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { UserLanguage } from '../../../app';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { RootDispatch, RootState } from '../../../app/state/store';
import { LANGUAGES } from '../../constants/language';
import { UpdateUserPayload } from '../../state/models/user-selected';
import ModalLanguage from '../modal/ModalLanguage';
import { UserLanguagesDisplay } from './UserLanguagesDisplay';

interface Props {
  isFetching: boolean,
  userId?: number,
  userLanguages: UserLanguage[],
  fetchLanguages: (userId: number | undefined) => Promise<void>,
  modifyUser: (payload: UpdateUserPayload) => void,
  resetLanguage: () => void,
  updateUserLanguage: (language: UserLanguage) => void,
}

interface State {
  isModalShown: boolean,
  unselectedLanguages: string[],
}

export class TalentFormLanguages extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
      unselectedLanguages: LANGUAGES,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.userLanguages.length !== prevProps.userLanguages.length) {
      const userLanguages = this.props.userLanguages.map(({ language }) => (language));

      this.setState({
        unselectedLanguages: this.state.unselectedLanguages
          .filter((language) => !userLanguages.includes(language)),
      });
    }
  }

  componentDidMount = async () => {
    await this.props.fetchLanguages(this.props.userId);
  }

  toggleModalAndResetModalOnQuit = () => {
    this.setState({ isModalShown: !this.state.isModalShown });

    if (!this.state.isModalShown) {
      this.props.resetLanguage();
    }
  }

  updateUserLanguage = (property: string, value: string) => {
    this.props.updateUserLanguage({ language: property, level: value });
  }

  render() {
    return (
      <div className="form-section almost-large">
        <div className="form-elements">
          <div className="section-add">
            <h6>Langues: </h6>
            <Button
              onClick={this.toggleModalAndResetModalOnQuit}
              className="form-add-button"
              color="default"
              disabled={this.props.isFetching}
            >
              Ajouter une langue
            </Button>
          </div>
        </div>
        {
          (this.props.userLanguages.length > 0) &&
          <UserLanguagesDisplay
            userLanguages={this.props.userLanguages}
            updateUserLanguage={this.updateUserLanguage}
          />
        }
        <ModalCustom
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModalAndResetModalOnQuit}
          titleModal="Ajouter une langue"
        >
          <ModalLanguage
            languages={this.state.unselectedLanguages}
          />
        </ModalCustom>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  userLanguages: state.userLanguages.languages,
  isFetching: state.userLanguages.isFetching,
  userId: state.userSelected.userSelected.id,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchLanguages: dispatch.userLanguages.fetchLanguages,
  updateUserLanguage: dispatch.userLanguages.updateUserLanguage,
  resetLanguage: dispatch.addLanguage.resetLanguage,
});

export default connect(mapState, mapDispatch)(TalentFormLanguages);