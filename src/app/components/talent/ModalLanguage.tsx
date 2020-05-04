import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { RootDispatch, RootState, } from '../../state/store';
import { Language } from './state';
import FieldForm from './utils/FieldForm';

interface Props {
  optionsLevelLanguage: string[],
  language: Language,
  resetLanguage: () => void
}

interface State {
  optionLanguage: string[],
}

export class ModalLanguage extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props);
    
    this.state = {
      optionLanguage: [
        'Afrikaans','Albanian','Arabic','Armenian','Basque','Bengali','Bulgarian','Catalan','Cambodian',
        'Chinese (Mandarin)','Croatian','Czech','Danish','Dutch','English','Estonian','Fiji','Finnish','French',
        'Georgian','German','Greek','Gujarati','Hebrew','Hindi','Hungarian','Icelandic','Indonesian','Irish','Italian',
        'Japanese','Javanese','Korean','Latin','Latvian','Lithuanian','Macedonian','Malay','Malayalam','Maltese',
        'Maori','Marathi','Mongolian','Nepali','Norwegian','Persian','Polish','Portuguese','Punjabi','Quechua',
        'Romanian','Russian','Samoan','Serbian','Slovak','Slovenian','Spanish','Swahili','Swedish ','Tamil','Tatar',
        'Telugu','Thai','Tibetan','Tonga','Turkish','Ukrainian','Urdu','Uzbek','Vietnamese','Welsh','Xhosa'
      ],
    };
  }

  componentDidMount(): void {
    this.props.resetLanguage();
  }

  render() {
    return (
      <>
        <Row>
          <FieldForm
            type="select"
            keyName="language"
            label="Ajouter une nouvelle langue"
            selectOptions={ this.state.optionLanguage }
          />
        </Row>
        { this.props.language.language !==''&&
          <Row className=" d-flex">
            <FieldForm
              type="select"
              label="niveau"
              keyName='level'
              selectOptions={ this.props.optionsLevelLanguage }
            />
          </Row>
        }
        {
          this.props.language.level !=='' &&
            <Row>
              <Button className="form-add-button" color='default'> Ajouter une langue </Button>
            </Row>
        }
      </>
    );
  }
}

const  mapState = (state: RootState) => ({
  language: state.language.language
});

const  mapDispatch = ( dispatch: RootDispatch) => ({
  postLanguage: dispatch.language.postLanguage,
  resetLanguage: dispatch.language.resetLanguage,
});

export default connect(mapState, mapDispatch)(ModalLanguage);
