import React from 'react';
import { User } from '../../../app';

interface Props {
  talent: User,
}

export class TalentFormSkills extends React.Component<Props> {
  render() {
    return (
      <div className="form-section">
        <div className="section-add">
          <h6>Skills</h6>
        </div>
        <h1>Import module</h1>
      </div>
    );
  }
}

export default TalentFormSkills;
