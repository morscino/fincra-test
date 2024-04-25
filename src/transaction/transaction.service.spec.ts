import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from "../../src/prisma/prisma.service";
import { WalletService } from '@wallet/wallet.service';

describe('TransactionService', () => {
  let service: TransactionService;
  const mockPrismaService = {}
  const mockWalletService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService,PrismaService,WalletService],
    }).overrideProvider(PrismaService)
    .useValue(mockPrismaService)
    .overrideProvider(WalletService)
    .useValue(mockWalletService).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
