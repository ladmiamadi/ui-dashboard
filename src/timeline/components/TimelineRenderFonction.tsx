import React from 'react';
import { timelineRenderFonctionInterface } from '../index';

export const TimelineRenderFonction = ({ group }: timelineRenderFonctionInterface) => {
  return (
    <div className="custom-group"
      style={{
        textAlign: 'left',
        fontSize: '11px',
        color: 'black',
        borderColor : 'black',
      }}
    >
      <span className="title">[{group.rightTitle}] - {group.title} {group.groupLabelKey[0]}.</span>
    </div>
  );
};

export default TimelineRenderFonction;