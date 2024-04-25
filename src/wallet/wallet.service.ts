import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../src/prisma/prisma.service";
import { Wallet, WalletHistory } from "./entities/wallet.entity";
import { TransactionStatus } from "src/transaction/transaction.enum";
import { RedisService } from "@common/redis";
import { Currency, RedisKeys, WALLET_LOCK_TTL } from "@common/enums";
import { Utils } from "@common/utils";

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService, private redis: RedisService) {}

  async createWalletWithHistory(currency: Currency): Promise<Wallet> {
    let wallet: Wallet = {
      balance: 0,
      change_amount: 0,
      mode: "credit",
      currency,
    };
    // start db txn
    return await this.prisma.$transaction(async (tx) => {
      const newWallet = await tx.wallets.create({ data: { ...wallet } });
      wallet.id = newWallet.id;
      const walletHistory = await this.getHistory(wallet);
      // create history
      await tx.wallets_history.create({ data: { ...walletHistory } });

      return wallet;
    });
  }

  async updateWalletLedger(debitWallet: Wallet, creditWallet: Wallet) {
    // get histories
    const debitWalletHistory = await this.getHistory(debitWallet);
    const creditWalletHistory = await this.getHistory(creditWallet);
    // start txn
    return await this.prisma.$transaction([
      // update debit wallet and create history
      this.prisma.wallets.update({
        where: {
          id: debitWallet.id,
        },
        data: {
          ...debitWallet,
        },
      }),
      this.prisma.wallets_history.create({ data: { ...debitWalletHistory } }),

      // mark txn as successful
      //this.prisma.transactions.update({where:{id:debitWallet.transaction_id},data:{status:TransactionStatus.Success}}),

      // update credit wallet and create history
      this.prisma.wallets.update({
        where: {
          id: creditWallet.id,
        },
        data: {
          ...creditWallet,
        },
      }),
      this.prisma.wallets_history.create({ data: { ...creditWalletHistory } }),
    ]);
  }

  async getHistory(wallet: Wallet): Promise<WalletHistory> {
    const walletHistory: WalletHistory = {
      balance: wallet.balance,
      change_amount: wallet.change_amount,
      mode: wallet.mode,
      currency: wallet.currency,
      wallet_id: wallet.id,
      transaction_id: wallet.transaction_id,
    };
    return walletHistory;
  }

  async lockWallet(id: string): Promise<string> {
    const lockKey = Utils.genRandomReference(16);
    const key = `${RedisKeys.LockWallet}:${id}`;
    await this.redis.setWithExpiry(key, lockKey, WALLET_LOCK_TTL);
    return lockKey;
  }
  async unlockWallet(id: string) {
    const key = `${RedisKeys.LockWallet}:${id}`;
    await this.redis.delete(key)
    return;
  }
  async walletIsLocked(id: string, lockKey: string): Promise<boolean> {
    const key = `${RedisKeys.LockWallet}:${id}`;
    const lock = await this.redis.get(key)
    return lockKey == lock;
  }
}
