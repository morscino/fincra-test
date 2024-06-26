import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports:[WalletModule],
  controllers: [],
  providers: [TransactionService],
  exports:[TransactionService]
})
export class TransactionModule {}
