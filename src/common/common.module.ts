import { Global, Module } from '@nestjs/common';
import { AppException } from './exception';
import { RedisService } from './redis';
import { ConfigModule } from '@config/config.module';

@Global()
@Module({
    imports:[ConfigModule],
    providers: [AppException,RedisService],
    exports: [AppException,RedisService],
})
export class CommonModule {}
