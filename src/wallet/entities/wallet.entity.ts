import { wallets } from "@prisma/client";

export class WalletEntity implements wallets {
  id: string;
  balance: number;
  change_amount: number;
  mode: string;
  currency: string;
  transaction_id: string;
  created_at: Date;
  updated_at: Date;
}

export class Wallet {
  id?:string;
  balance: number;
  change_amount: number;
  mode: string;
  currency: string;
  transaction_id?: string;
}
export class WalletHistory {
  id?:string;
  balance: number;
  change_amount: number;
  mode: string;
  wallet_id:string;
  currency: string;
  transaction_id?: string;
}
