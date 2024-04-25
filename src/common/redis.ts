import { Injectable } from '@nestjs/common';
import {Client} from 'redis-om';
import {createClient} from 'redis'
import { ConfigService } from '@config/config.service';


@Injectable()
export class RedisService {
    private client: Client;
    constructor(private config: ConfigService) {}

    async onModuleInit() {
        const redis = createClient({url:this.config.REDIS_URI,pingInterval: 1000,legacyMode:true})
        this.client = await new Client().use(redis)
        //.open(this.config.REDIS_URI);
        // redis.on('error', (err) => console.log('Redis Client Error', err));
        // await redis.connect()
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