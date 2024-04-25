import { Module } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { AppException } from 'src/common/exception';

@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
