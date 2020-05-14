export interface User {
  id: number | string | null;
  username: string;
  email: string;
}

export interface Module {
  name: string;
  description: string;
}

export interface Transaction {
  id: number;
  name: string;
  phase: string;
  amount: number;
  commissionAmount: number;
  date: string;
  description: string;
  isSelected: boolean;
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

