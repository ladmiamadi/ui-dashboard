import { HubspotOwnerType, User } from '../index.d';

export const createEmptyUser = (): User => ({
  id: null,
  username: '',
  email: '',
  hubspotOwnerId: HubspotOwnerType.NONE,
});
