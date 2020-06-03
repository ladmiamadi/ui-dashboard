import { User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: null,
  username: '',
  password: '',
});
