import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { User } from '../../../app';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { RootDispatch, RootState } from '../../../app/state/store';
import { LANGUAGES } from '../../constants/language';
import { UpdateUserPayload } from '../../state/models/user-selected';
import ModalLanguage from '../modal/ModalLanguage';
import { UserLanguagesDisplay } from './UserLanguagesDisplay';

interface Props {
  user: User,
  isRequesting: boolean,
  modifyUser: (payload: UpdateUserPayload) => void,
  removeUserLanguage: (index: number) => void,
  resetLanguage: () => void,
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
      unselectedLanguages: this.updateLanguageList(),
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.user.userLanguages?.length !== prevProps.user.userLanguages?.length) {
      this.setState({
        unselectedLanguages: this.updateLanguageList(),
      });
    }
  }

  updateLanguageList() {
    if (this.props.user.userLanguages) {
      const userLanguages = this.props.user.userLanguages.map(({ language }) => (language));

      return LANGUAGES.filter((language) => !userLanguages?.includes(language));
    }

    return [];
  }

  toggleModalAndResetModalOnQuit = () => {
    this.setState({ isModalShown: !this.state.isModalShown });

    if (!this.state.isModalShown) {
      this.props.resetLanguage();
    }
  }

  render() {
    return (
      <div className="form-section almost-large">
        <div className="section-add">
          <h6>Langues: </h6>
          <Button
            onClick={this.toggleModalAndResetModalOnQuit}
            className="form-add-button"
            color="default"
            disabled={this.props.isRequesting}
          >
            Ajouter une langue
          </Button>
        </div>
        {
          (this.props.user.userLanguages && this.props.user.userLanguages.length > 0) &&
          <UserLanguagesDisplay
            userLanguages={this.props.user.userLanguages}
            modifyUser={this.props.modifyUser}
            handleDeleteButtonClick={this.props.removeUserLanguage}
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
  user: state.userSelected.userSelected,
  isRequesting: state.userSelected.isRequesting,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  resetLanguage: dispatch.addLanguage.resetLanguage,
  modifyUser: dispatch.userSelected.modifyUser,
  removeUserLanguage: dispatch.userSelected.removeUserLanguage,
});

export default connect(mapState, mapDispatch)(TalentFormLanguages);