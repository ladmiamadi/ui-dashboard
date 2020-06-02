import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';
import { RootDispatch, RootState } from '../../../app/state/store';

interface Props {
  talent: User,
  modifyUser: (event: any) => void,
}

interface State {
  talent: User,
}

export class TalentFormLanguages extends React.Component<Props> {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Langues: </h6>
          <button className="form-add-button">Ajouter une langue</button>
        </div>
        <SelectFormField
          keyName="language-french"
          label="Français: "
          options={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
        <SelectFormField
          keyName="language-english"
          label="Anglais: "
          options={ ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
          className="medium"
        />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  talent: state.user.user
});

const mapDispatch = (dispatch: RootDispatch) => ({
  modifyUser: dispatch.user.modifyUser,
});

export default connect(mapState, mapDispatch)(TalentFormLanguages);
