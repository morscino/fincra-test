import { AccountEntity } from "src/account/entities/account.entity";
import { Currency } from "./enums";
import { WalletEntity } from "@wallet/entities/wallet.entity";
import { TransactionEntity } from "@transaction/entities/transaction.entity";

export class MockHelper {
  static mockAccount() {
    const account: AccountEntity = {
      id: "907936ff-044a-48b3-a6cb-cc4d12c2f78b",
      account_name: "Dada Babatunde",
      bank_name: "Fincra Bank",
      account_number: "4179552479",
      phone_number: "+2348176129236",
      currency: Currency.NGN,
      wallet: this.mockWallet(),
      wallet_id: "29189d54-0d81-41bc-8c33-27ce3918e932",
      created_at: new Date("2024-04-24T16:14:19.226Z"),
      updated_at: new Date("2024-04-24T16:14:19.226Z"),
    };
    return account;
  }

  static mockWallet() {
    const wallet: WalletEntity = {
      id: "29189d54-0d81-41bc-8c33-27ce3918e932",
      transaction_id: "7b6b8707-2afe-4ecb-b3c0-bbd8ca320554",
      balance: 1000,
      change_amount: 900,
      mode: "credit",
      currency: Currency.NGN,
      created_at: new Date("2024-04-24T16:14:19.226Z"),
      updated_at: new Date("2024-04-24T16:14:19.226Z"),
    };
    return wallet;
  }

  static mockTransaction(){
    const transaction : TransactionEntity = {
        id: "7b6b8707-2afe-4ecb-b3c0-bbd8ca320554",
        type: "account-funding",
        amount: 50000,
        fee: 0,
        reference: "O0ALYSEYNN",
        status: "success",
        account_id: "907936ff-044a-48b3-a6cb-cc4d12c2f78b",
        sender_account_name: "Jaiye Olu",
        sender_account_number: "1025389585",
        sender_bank_name: "UBA plc",
        beneficiary_account_name: "Dada Babatunde",
        beneficiary_account_number: "4179552479",
        beneficiary_bank_name: "Fincra Bank",
        mode: "credit",
        currency: "NGN",
        created_at: new Date("2024-04-24T16:17:47.376Z"),
        updated_at: new Date("2024-04-24T16:17:47.425Z")
    }
    return transaction
  }
}
