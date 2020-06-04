import React from 'react';
import { UserLanguage } from '../../../app';
import { SelectFormField } from '../../../app/components/utils/SelectFormField';

interface Props {
  userLanguages: UserLanguage[]
  options: string[]
}

export class UserLanguagesDisplay extends React.Component<Props> {
  render() {
    return (
      <>
        {
          this.props.userLanguages.map(({ language, level }, index) =>
            <SelectFormField
              key={index}
              keyName={'language-' + language}
              label={language}
              className="medium"
              options={this.props.options}
              defaultValue={level}
            />,
          )
        }
      </>
    );
  }
}