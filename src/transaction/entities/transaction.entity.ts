import { transactions } from "@prisma/client";

export class TransactionEntity implements transactions {
  id: string;
  type: string;
  amount: number;
  fee: number;
  reference: string;
  account_id: string;
  sender_account_name: string;
  sender_account_number: string;
  status: string;
  sender_bank_name: string;
  beneficiary_account_name: string;
  beneficiary_account_number: string;
  beneficiary_bank_name: string;
  mode: string;
  currency: string;
  created_at: Date;
  updated_at: Date;
}

export class Transaction {
    type: string;
    amount: number;
    fee: number;
    reference: string;
    account_id: string;
    sender_account_name: string;
    sender_account_number: string;
    status: string;
    sender_bank_name: string;
    beneficiary_account_name: string;
    beneficiary_account_number: string;
    beneficiary_bank_name: string;
    mode: string;
    currency: string;
  }
  
