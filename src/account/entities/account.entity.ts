import { accounts, wallets } from "@prisma/client";
import { Currency } from "@common/enums";

export class AccountEntity implements accounts {
    id: string;
    account_name: string;
    bank_name: string;
    account_number: string;
    phone_number: string;
    currency: Currency;
    wallet_id: string;
    created_at: Date;
    updated_at: Date;
    wallet:wallets;
  }