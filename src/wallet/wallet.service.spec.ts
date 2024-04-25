import { RedisService } from '@common/redis';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '@wallet/wallet.service';
import { PrismaService } from "../../src/prisma/prisma.service";


describe('WalletService', () => {
  let service: WalletService;
  const mockPrismaService = {}
  const mockRedisService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService,PrismaService,RedisService],
    }).overrideProvider(PrismaService)
    .useValue(mockPrismaService)
    .overrideProvider(RedisService)
    .useValue(mockRedisService).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
