import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { RootDispatch, RootState, } from '../../../app/state/store';
//import { UserLanguage } from '../../../app/index';
import { Language } from './state/index';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { UpdateLanguagePayload } from './state/models/userLanguage';

interface Props {
  optionsLevelLanguage: string[],
  language: Language,
  resetLanguage: () => void,
  updateLanguage: (payload:UpdateLanguagePayload)=> void
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
    console.log(this.props.language);
  }

  updateLanguageTest = (property:string, value:string) => {
    const payload = {
      property: property,
      value: value
    };
    console.log('ici payload',payload);

    this.props.updateLanguage(payload);

  }

  render() {
    return (
      <>
        <Row>
          <SelectFormField
            keyName="language"
            label="Ajouter une nouvelle langue"
            options={ this.state.optionLanguage }
            updateModel={ this.updateLanguageTest }
          />
        </Row>
        { this.props.language.language !== '' &&
          <Row className=" d-flex">
            <SelectFormField
              label="niveau"
              keyName='level'
              options={ this.props.optionsLevelLanguage }
              updateModel={ this.updateLanguageTest }
            />
          </Row>
        }
        {
          this.props.language.level !== '' &&
            <Row>
              <Button className="form-add-button modal-button" color='default'> Ajouter une langue </Button>
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
  // postLanguage: dispatch.language.postLanguage,
  resetLanguage: dispatch.language.resetLanguage,
  updateLanguage: dispatch.language.updateLanguage,

});

export default connect(mapState, mapDispatch)(ModalLanguage);
