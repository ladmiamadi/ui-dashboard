import React from 'react';
import { Button } from 'reactstrap';
import history from '../../../app/helpers/history';

interface Props {
    resetForm: () => void,
    setAddEdit: () => void,
}

interface State {
    addEdit: boolean,
}

export class FormFooter extends React.Component<Props, State> {
  render() {
    return (
      <div className="form-footer">
        <Button
          color={'success'}

          //disabled={!isPostAvailable}
          onClick={this.props.setAddEdit}
          type="submit"
        >
                    Ajouter et Editer
        </Button>

        <Button
          type="submit"
        >
                    Ajouter
        </Button>

        <Button
          color="warning"
          onClick={this.props.resetForm}
        >
                    Tout effacer
        </Button>

        <Button
          color="secondary"
          onClick={() => history.push('/dashboard/our-offers')}
        >
                    Retour
        </Button>
      </div>
    );
  }
}

export default FormFooter;