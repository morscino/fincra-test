import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { TransactionService } from "@transaction/transaction.service";
import { WalletService } from "@wallet/wallet.service";
import { CreateAccountDto, FundAccountDto, TransferDto } from "@account/dto/account.dto";
import { AppException } from "@common/exception";
import { Utils } from "@common/utils";
import { Transaction } from "@transaction/entities/transaction.entity";
import { TransactionMode, TransactionStatus, TransactionType } from "@transaction/transaction.enum";
import { PrismaService } from "../../src/prisma/prisma.service";


@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private wallerService: WalletService,
    private transactionService: TransactionService
  ) {}

  // create account
  async createAccount(data: CreateAccountDto) {
    const account = await this.prisma.accounts.findFirst({
      where: { currency: data.currency, phone_number: data.phone_number },
    });
    if (account) {
      throw new AppException("account already exists", HttpStatus.BAD_REQUEST);
    }
    // create wallet with history
    const wallet = await this.wallerService.createWalletWithHistory(
      data.currency
    );

    // create account
    const accountData = {
      account_name: `${data.last_name} ${data.first_name}`,
      account_number: Utils.generateRandomAccountNumber(),
      phone_number: data.phone_number,
      currency: data.currency,
      wallet_id: wallet.id,
    };

    return await this.prisma.accounts.create({ data: { ...accountData } });
  }

  // get account
  async getAccount(id: string) {
    const account =  await this.prisma.accounts.findFirst({
      where: { id },
      include: { wallet: true },
    });
    if (!account){
      throw new AppException("account not found", HttpStatus.BAD_REQUEST);
    }
    return account
  }

  // credit account
  async fundAccount(data: FundAccountDto) {
    // get account with acc number
    const account = await this.prisma.accounts.findFirst({
      where: { account_number: data.account_number },
      include: { wallet: true },
    });
    if (!account) {
      throw new AppException("account not found", HttpStatus.BAD_REQUEST);
    }

    // create account funding txn
    const transactionData: Transaction = {
      type: TransactionType.AccountFunding,
      amount: data.amount,
      fee: 0,
      reference: Utils.genRandomReference(),
      account_id: account.id,
      status: TransactionStatus.Pending,
      sender_account_name: data.sender_account_name,
      sender_account_number: data.sender_account_number,
      sender_bank_name: data.sender_bank_name,
      beneficiary_account_name: account.account_name,
      beneficiary_account_number: account.account_number,
      beneficiary_bank_name: account.bank_name,
      mode: TransactionMode.Credit,
      currency: data.currency,
    };
    let transaction = await this.transactionService.createTransaction(
      transactionData
    );

    // process account funding txn in a try catch
    try {
      await this.transactionService.processAccountFunding(
        transaction,
        account.wallet
      );
      // update txn to success
      transaction = await this.transactionService.updateTransaction(
        transaction.id,
        { status: TransactionStatus.Success }
      );
    } catch (error) {
      // update txn to failure
      console.log(error);
      transaction = await this.transactionService.updateTransaction(
        transaction.id,
        { status: TransactionStatus.Failed }
      );
    }
    // return processed transaction
    return transaction;
  }

  // bank transfer
  async bankTransfer(data: TransferDto) {
    // get account with acc number
    const account = await this.prisma.accounts.findFirst({
      where: { account_number: data.account_number },
      include: { wallet: true },
    });
    if (!account) {
      throw new AppException("account not found", HttpStatus.BAD_REQUEST);
    }
    // check for duplicate txn
    const now = new Date()
    const duplicateTransaction = await this.prisma.transactions.findFirst({
      where: {
        account_id: account.id,
        beneficiary_account_number: data.beneficiary_account_number,
        type: TransactionType.BankTransfer,
        amount: data.amount,
        created_at: { gte: new Date(now.setMinutes(now.getMinutes() - 2)) },
      },
    });
    
    if(duplicateTransaction){
      throw new AppException("duplicate transaction", HttpStatus.BAD_REQUEST);
    }
    // lock wallet
    const lockKey = await this.wallerService.lockWallet(account.wallet_id)
    // check for insufficient fund
    if (account.wallet.balance < data.amount) {
      throw new AppException("insufficient balance", HttpStatus.BAD_REQUEST);
    }
    // create debit transaction
    const transactionData: Transaction = {
      type: TransactionType.BankTransfer,
      amount: data.amount,
      fee: 0,
      reference: Utils.genRandomReference(),
      account_id: account.id,
      status: TransactionStatus.Pending,
      sender_account_name: account.account_name,
      sender_account_number: account.account_number,
      sender_bank_name: account.bank_name,
      beneficiary_account_name: data.beneficiary_account_name,
      beneficiary_account_number: data.beneficiary_account_number,
      beneficiary_bank_name: data.beneficiary_bank_name,
      mode: TransactionMode.Debit,
      currency: data.currency,
    };
    let transaction = await this.transactionService.createTransaction(
      transactionData
    );

    // ensure wallet is locked
    const isLocked = await this.wallerService.walletIsLocked(account.wallet_id,lockKey)
    if (!isLocked){
      throw new AppException("invalid transaction", HttpStatus.BAD_REQUEST);
    }
    // process debit txn in a try and catch
    try {
      await this.transactionService.processTransfer(
        transaction,
        account.wallet
      );
      // update txn to success
      transaction = await this.transactionService.updateTransaction(
        transaction.id,
        { status: TransactionStatus.Success }
      );
    } catch (error) {
      // update txn to failure
      console.log(error);
      transaction = await this.transactionService.updateTransaction(
        transaction.id,
        { status: TransactionStatus.Failed }
      );
    }
    //unlock wallet
    await this.wallerService.unlockWallet(account.wallet_id)
    // return processed transaction
    return transaction;
  }
}
