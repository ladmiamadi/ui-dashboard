import React from 'react';
import { Button } from 'reactstrap';
import { FieldForm } from './utils/FieldForm';

interface Props {
  optionsLevelLanguage: string[]
}

interface State {
  optionLanguage: string[],
  optionLanguageHasValue: boolean
  optionLevelLanguageHasValue: boolean
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
      optionLanguageHasValue: false,
      optionLevelLanguageHasValue: false,
    };
  }

  levelLanguageIsShowing = (value:boolean) =>{ this.setState({ optionLanguageHasValue: value });};

  buttonAddLanguageIsShowing = (value:boolean) =>{ this.setState({ optionLevelLanguageHasValue : value });}

  render() {
    return (
      <>
        <FieldForm
          type="select"
          keyName="language"
          label="Ajouter une nouvelle langue"
          selectOptions={ this.state.optionLanguage }
          showOtherComponents={ this.levelLanguageIsShowing }
        />
        {
          this.state.optionLanguageHasValue &&
           <FieldForm
             type="select"
             label="niveau"
             keyName='level-language'
             selectOptions={ this.props.optionsLevelLanguage }
             showOtherComponents={ this.buttonAddLanguageIsShowing }
           />
        }
        {
          this.state.optionLevelLanguageHasValue &&
          <Button> Ajouter un client </Button>
        }
      </>
    );
  }
}
