export interface User {
  id: number | string | null;
  username: string;
  email: string;
}

export interface Module {
  name: string;
  description: string;
  linkText: HubspotOwnerType;
}

export interface Transaction {
  id: number;
  name: string;
  phase: string;
  amount: number;
  commissionAmount: number;
  date: string;
  description: string;
  ownerId: HubspotOwnerType;
  isSelected: boolean;
}

export enum HubspotOwnerType {
  ADMIN = '37896147',
  ANTONIO = '42803862',
  NONE = '',
}

export interface Client {
  id: number;
  firstname: string;
  lastname: string;
  user: string;
  phone: number;
  address: string;
  email: string;
}

