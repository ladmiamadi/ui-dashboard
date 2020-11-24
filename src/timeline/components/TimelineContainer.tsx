import React from 'react';
import { RootDispatch, RootState } from '../../app/state/store';
import { Loader } from '../../app/components/utils/Loader';
import { User } from '../../app';
import { connect } from 'react-redux';
import TimelineCustom from './TimelineCustom';
import TimelineTitle from './TimelineTitle';
import TimelineOptions from './TimelineOptions';
import { listOfFonctionsInterface, 
  visibleTimeInterface, 
  displayDataTimelineInterface, 
  timelineFilters,
  timelineContainerPropsInterface,
} from '../index';
import { convertRawDBDataToTimelineData } from '../helpers/databaseUserDataToTimelineData';

interface Props {
  updateTimelineReason: (reason: string) => void,
  updateTimelineSearchName: (searchName: string) => void,
  updateTimelineUsers: (timelineUsers: displayDataTimelineInterface) => void,
  updateTimelineVisibleTime: (visibleTime: visibleTimeInterface) => void,
  updateTimelineFonctions: (timelineFonctions: listOfFonctionsInterface[]) => void,
  updateTimelineEmptyField: (displayEmptyField: boolean) => void,
  timeline: timelineFilters,
  users: User[],
  isFetching: boolean,
  fetchTalents: () => void,
}

export class TimelineContainer extends React.Component<Props> {
  componentDidMount = async () => {
    await this.props.fetchTalents();
    let updateTimeline: timelineContainerPropsInterface = this.props;
    convertRawDBDataToTimelineData(updateTimeline, this.props.timeline);
  }

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }
     
    return (
      <div>
        <TimelineTitle />
        <TimelineOptions {...this.props} />
        <TimelineCustom />
      </div>);
  }
}

const mapState = (state: RootState) => ({
  timeline: state.timeline,
  users: state.users.users,
  isFetching: state.users.isFetching,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  updateTimelineVisibleTime: dispatch.timeline.updateTimelineVisibleTime,
  updateTimelineReason: dispatch.timeline.updateTimelineReason,
  updateTimelineSearchName: dispatch.timeline.updateTimelineSearchName,
  updateTimelineEmptyField: dispatch.timeline.updateTimelineEmptyField,
  updateTimelineUsers: dispatch.timeline.updateTimelineUsers,
  updateTimelineFonctions: dispatch.timeline.updateTimelineFonctions,
  fetchTalents: dispatch.users.fetchTalents,
});

export default connect(mapState, mapDispatch)(TimelineContainer);