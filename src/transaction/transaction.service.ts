import { Injectable } from "@nestjs/common";
import { Transaction } from "./entities/transaction.entity";
import { PrismaService } from "../../src/prisma/prisma.service";

import { AccountEntity } from "src/account/entities/account.entity";
import { accounts, transactions, wallets } from "@prisma/client";

import { Wallet } from "src/wallet/entities/wallet.entity";
import { TransactionMode } from "./transaction.enum";
import { WalletService } from "@wallet/wallet.service";
import { ReserveAccSlug } from "@common/enums";

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private wallerService: WalletService
  ) {}
  async createTransaction(transaction: Transaction) {
    return await this.prisma.transactions.create({ data: { ...transaction } });
  }

  async processAccountFunding(transaction: transactions, wallet: wallets) {
    //  get reserve account
    const reserve = await this.prisma.reserve_accounts.findFirst({
      where: { slug: ReserveAccSlug.NgnMain },
      include: { wallet: true },
    });

    // decrement debit and increment credit
    const debitWallet = await this.decrementWallet(reserve.wallet, transaction);
    const creditWallet = await this.incrementWallet(wallet, transaction);

    // update ledger
    await this.wallerService.updateWalletLedger(debitWallet, creditWallet);
  }

  async processTransfer(transaction: transactions, wallet: wallets) {
    //  get reserve account
    const reserve = await this.prisma.reserve_accounts.findFirst({
      where: { slug: ReserveAccSlug.NgnMain },
      include: { wallet: true },
    });

    // decrement debit and increment credit
    const debitWallet = await this.decrementWallet(wallet, transaction);
    const creditWallet = await this.incrementWallet(reserve.wallet, transaction);

    // update ledger
    await this.wallerService.updateWalletLedger(debitWallet, creditWallet);
  }

  async incrementWallet(wallet: wallets, txn: transactions): Promise<Wallet> {
    return {
      id: wallet.id,
      balance: wallet.balance + txn.amount,
      change_amount: txn.amount,
      transaction_id: txn.id,
      currency: txn.currency,
      mode: TransactionMode.Credit,
    };
  }

  async decrementWallet(wallet: wallets, txn: transactions): Promise<Wallet> {
    return {
      id: wallet.id,
      balance: wallet.balance - txn.amount,
      change_amount: -txn.amount,
      transaction_id: txn.id,
      currency: wallet.currency,
      mode: TransactionMode.Debit,
    };
  }

  async updateTransaction(id: string, data: any) {
    return await this.prisma.transactions.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

}
