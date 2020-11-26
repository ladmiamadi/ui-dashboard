import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader';
import { User } from '../../app';
import { connect } from 'react-redux';
import TimelineCustom from './TimelineCustom';
import TimelineTitle from './TimelineTitle';
import TimelineOptions from './TimelineOptions';

interface Props {
  initTimeline: (users: User[]) => void,
  users: User[],
  isFetching: boolean,
  isConverting: boolean,
  fetchTalents: () => void,
}

export class TimelineContainer extends React.Component<Props> {
  componentDidMount = async () => {
    await this.props.fetchTalents();
    await this.props.initTimeline(this.props.users);
  }

  render() {
    if (this.props.isFetching || this.props.isConverting) {
      
      return <Loader />;
    }

    return (
      <div>
        <TimelineTitle />
        <TimelineOptions />
        <TimelineCustom />
      </div>);
  }
}

const mapState = (state: RootState) => ({
  users: state.users.users,
  isFetching: state.users.isFetching,
  isConverting: state.timeline.isConverting,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchTalents: dispatch.users.fetchTalents,
  initTimeline: dispatch.timeline.initTimeline,
});

export default connect(mapState, mapDispatch)(TimelineContainer);