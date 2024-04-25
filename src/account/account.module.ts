import { Module } from '@nestjs/common';
import { TransactionModule } from '@transaction/transaction.module';
import { WalletModule } from '@wallet/wallet.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports:[PrismaModule,WalletModule,TransactionModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
