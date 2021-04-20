import React from 'react';
import { connect } from 'react-redux';
import { Job } from '../../app';
import { RootDispatch } from '../../app/state/store';
import OffersListElement from './OffersListElement';

interface Props {
  //searchTerm: string,
  jobs: Job[],
  //updateUserSelected: (userSelected: User) => void,
}

interface State {
  isModalOpen: boolean,
}

export class OffersList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isModalOpen: false };
  }

  render() {
    const filteredOffers = this.props.jobs

    return (
      <div>
        { filteredOffers.length > 0 ? (
          <div className="offer-container" >
            {
              filteredOffers.map((offer) => (
                  <OffersListElement
                    job={offer}
                    key={offer.id}
                  />
                ))
            }
                </div>
              ) : (
            <h1 className="no-user-found">Aucune offre correspondante n'a été trouvée.</h1>
        )
        }
          </div>
        );
  }
}

const mapDispatch = (dispatch: RootDispatch) => ({

});

export default connect(() => {}, mapDispatch)(OffersList);
