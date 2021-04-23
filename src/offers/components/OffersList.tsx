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
 constructor(props: Props){
  super(props)
   this.state = { jobs: this.props.jobs };
 }

toggleOpenJob(job: Job){
  
  const jobs= this.state.jobs

  jobs.map(item=>{
    if(job.id===item.id){
        job.isOpen=!job.isOpen
      this.props.updateSelectedOffer(_.cloneDeep(item));
        this.setState({jobs})
    }
  });

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
                    ToggleOpenJob={()=>this.toggleOpenJob(offer)}
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

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateSelectedOffer: dispatch.selectedOffer.saveOfferInDb
  
});

export default connect(mapState, mapDispatch)(OffersList);
