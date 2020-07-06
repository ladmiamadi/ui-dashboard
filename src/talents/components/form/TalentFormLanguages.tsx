import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { RootDispatch } from '../../../app/state/store';
import { UserLanguageHelper } from '../../helpers/userLanguageHelper';
import { UpdateUserPayload } from '../../state/models/userSelected';
import ModalLanguage from '../modal/ModalLanguage';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { User } from '../../../app';
import { UserLanguagesDisplay } from './UserLanguagesDisplay';

interface Props {
  user: User,
  modifyUser: (value: UpdateUserPayload) => void,
  resetLanguage: () => void,
}

interface State {
  isModalShown: boolean,
}

export class TalentFormLanguages extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalShown: false,
    };
  }

  toggleModalAndResetModalOnQuit = () => {
    this.setState({ isModalShown: !this.state.isModalShown });

    if (!this.state.isModalShown) {
      this.props.resetLanguage();
    }
  }

  updateUserLanguage = (property: string, value: string, index: number) => {
    this.props.modifyUser({
      value: value,
      index: index,
      category: 'userLanguages',
      property: property,
    });
  }

  render() {
    const userLanguages = this.props.user.userLanguages || [];
    return (
      <div className="form-section almost-large">
        <div className="section-add">
          <h6>Langues: </h6>
          <Button
            onClick={this.toggleModalAndResetModalOnQuit}
            className="form-add-button"
            color="default"
          >
            Ajouter une langue
          </Button>
        </div>
        <UserLanguagesDisplay
          userLanguages={userLanguages}
          updateUserLanguage={this.updateUserLanguage}
        />
        <ModalCustom
          isModalShown={this.state.isModalShown}
          toggleModal={this.toggleModalAndResetModalOnQuit}
          titleModal="Ajouter une langue"
        >
          <ModalLanguage
            userSelected={this.props.user}
            languages={UserLanguageHelper.filterLanguageList(userLanguages)}
          />
        </ModalCustom>
      </div>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  resetLanguage: dispatch.addLanguage.resetLanguage,
});

export default connect(mapState, mapDispatch)(TalentFormLanguages);
