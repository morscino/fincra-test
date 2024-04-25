import { Injectable } from '@nestjs/common';
import { Client} from 'redis-om';
import { ConfigService } from '@config/config.service';


@Injectable()
export class RedisService {
    private client: Client;
    constructor(private config: ConfigService) {}

    async onModuleInit() {
        this.client = await new Client().open(this.config.REDIS_URI);
    }

    isOpen(): boolean {
        return this.client.isOpen();
    }

    async set(key: string, value: string) {
        return this.client.set(key, value);
    }

    async setWithExpiry(key: string, value: string, ttl: number) {
        await this.set(key, value);
        await this.client.expire(key, ttl);
        return;
    }

    async get(key: string): Promise<string> {
        return this.client.get(key);
    }

    async delete(key: string): Promise<any> {
        return this.client.unlink(key);
    }
}