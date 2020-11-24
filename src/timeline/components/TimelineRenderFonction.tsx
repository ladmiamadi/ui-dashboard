import React from 'react';
import { timelineRenderFonctionInterface } from '../index';

class TimelineRenderFonction extends React.Component<timelineRenderFonctionInterface>{
  render() {

    return (
      <div className="custom-group"
        style={{
          textAlign: 'left',
          fontSize: '11px',
          color: 'black',
          borderColor : 'black',
        }}
      >
        <span className="title">
          [{this.props.group.rightTitle}] - {this.props.group.title} {this.props.group.groupLabelKey[0]}.</span>
      </div>
    );
  }
}

export default TimelineRenderFonction;