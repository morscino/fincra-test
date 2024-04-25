import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[PrismaModule,CommonModule],
  controllers: [],
  providers: [WalletService],
  exports:[WalletService]
})
export class WalletModule {}
