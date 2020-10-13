import { PropsForInputWithoutFunc, ARRAY_OF_ADMIN_USERNAMES } from '../index.d';

export const doubleArrayOfFormPropsConstructor = (): PropsForInputWithoutFunc[][] => {
  return ([
    [
      {
        type: 'select',
        label: 'Select your username',
        id: 'username',
        options: ARRAY_OF_ADMIN_USERNAMES,
      },
      {
        type: 'email',
        label: 'Email',
        id: 'email',
        placeholder: 'Type your email...',
      },
    ],
    [
      {
        type: 'password',
        label: 'Password',
        id: 'password',
        placeholder: 'Enter your password...',
      },
    ],
  ]);
};