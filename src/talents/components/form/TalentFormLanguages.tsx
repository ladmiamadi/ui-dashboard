import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import React from 'react';
import { RootDispatch, RootState } from '../../../app/state/store';
import ModalLanguage from './ModalLanguage';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { UserLanguage } from '../../../app';
import { UserLanguagesDisplay } from './UserLanguagesDisplay';

interface Props {
  fetchLanguages: () => Promise<void>,
  userLanguages: UserLanguage[],
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
      optionsLevelLanguage: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Langue Maternelle'],
      optionLanguage: [
        'Afrikaans','Albanian','Arabic','Armenian','Basque','Bengali','Bulgarian','Catalan','Cambodian',
        'Chinese (Mandarin)','Croatian','Czech','Danish','Dutch','English','Estonian','Fiji','Finnish','French',
        'Georgian','German','Greek','Gujarati','Hebrew','Hindi','Hungarian','Icelandic','Indonesian','Irish','Italian',
        'Japanese','Javanese','Korean','Latin','Latvian','Lithuanian','Macedonian','Malay','Malayalam','Maltese',
        'Maori','Marathi','Mongolian','Nepali','Norwegian','Persian','Polish','Portuguese','Punjabi','Quechua',
        'Romanian','Russian','Samoan','Serbian','Slovak','Slovenian','Spanish','Swahili','Swedish ','Tamil','Tatar',
        'Telugu','Thai','Tibetan','Tonga','Turkish','Ukrainian','Urdu','Uzbek','Vietnamese','Welsh','Xhosa',
      ],
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.userLanguages.length !== prevProps.userLanguages.length) {
      const userLanguages = this.props.userLanguages.map(({ language }) => (language));

      this.setState({
        optionLanguage: this.state.optionLanguage.filter((language) =>
          userLanguages.indexOf(language) === -1),
      });
    }
  }

  componentDidMount = async() => {
    await this.props.fetchLanguages();
  }

  toggleModal = () => this.setState({ isModalShown: !this.state.isModalShown });

  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Langues: </h6>
          <Button onClick={this.toggleModal} className="form-add-button" color="default">Ajouter une langue</Button>
        </div>
        <UserLanguagesDisplay
          userLanguages={this.props.userLanguages}
          options={this.state.optionsLevelLanguage}
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
});

export default connect(mapState, mapDispatch)(TalentFormLanguages);
