import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@account/account.service';
import { PrismaService } from "../../src/prisma/prisma.service";
import { WalletService } from '@wallet/wallet.service';
import { TransactionService } from '@transaction/transaction.service';

describe('AccountService', () => {
  let service: AccountService;
  const mockPrismaService = {}
  const mockWalletService = {}
  const mockTransactionService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService,PrismaService,WalletService,TransactionService],
    }).overrideProvider(PrismaService)
    .useValue(mockPrismaService)
    .overrideProvider(WalletService)
    .useValue(mockWalletService)
    .overrideProvider(TransactionService)
    .useValue(mockTransactionService)
    .compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
