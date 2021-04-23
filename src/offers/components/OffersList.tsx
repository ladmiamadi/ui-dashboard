import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Job } from '../../app';
import { RootDispatch, RootState } from '../../app/state/store';
import OffersListElement from './OffersListElement';

interface Props {
  searchTerm: string,
  jobs: Job[],
  updateSelectedOffer: (selectedOffer: Job) => void,
}

interface State {
  jobs: Job[]
}

export class OffersList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { jobs: this.props.jobs };
  }

  isMatchingJob(job: Job, searchTerm: string): boolean {
    return job.titleInFrench!.toLocaleLowerCase().includes(searchTerm)
      || job.titleInEnglish!.toLocaleLowerCase().includes(searchTerm)
      || job.titleInDutch!.toLocaleLowerCase().includes(searchTerm);
  }

  toggleOpenJob(job: Job) {

    const jobs = this.state.jobs

    jobs.map(item => {
      if (job.id === item.id) {
        job.isOpen = !job.isOpen
        this.props.updateSelectedOffer(_.cloneDeep(item));
        this.setState({ jobs })
      }
    });

  }
  render() {
    const filteredOffers = this.props.jobs
      .filter(job => this.isMatchingJob(job, this.props.searchTerm))
    return (
      <div>
        { filteredOffers.length > 0 ? (
          <div className="offer-container" >
            {
              filteredOffers.map((offer) => (
                <OffersListElement
                  job={offer}
                  key={offer.id}
                  ToggleOpenJob={() => this.toggleOpenJob(offer)}
                />
              ))
            }
          </div>
        ) : (
          <div className="no-offer-found">
            <h1>Aucune offre correspondante n'a été trouvée.</h1>
          </div>

        )
        }
      </div>
    );
  }
}

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateSelectedOffer: dispatch.selectedOffer.switchActiveOffer

});

export default connect(mapState, mapDispatch)(OffersList);
