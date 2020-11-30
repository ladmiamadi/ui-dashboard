import React from 'react';
import { GroupRenderObject } from '../index';
import './styles/TimelineRender.css';

class TimelineRenderFonction extends React.Component<GroupRenderObject>{
  render() {
    return (
      <div className="custom-group">
        <span className="title">
          [{this.props.group.rightTitle}] - {this.props.group.title} {this.props.group.groupLabelKey[0]}.</span>
      </div>
    );
  }
}

export default TimelineRenderFonction;