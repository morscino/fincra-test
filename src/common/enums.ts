export enum AppStatus {
    Success = 'success',
    Unauthorized = 'unauthorized',
    Forbidden = 'forbidden',
    BadRequest = 'bad-request',
    RequestTimeout = 'request-time-out',
    ConfigurationError = 'configuration-error'
}
export enum ReserveAccSlug {
    NgnMain = 'ngn-main'
}
export enum Currency{
    NGN = 'NGN'
}
export enum RedisKeys{
    LockWallet = 'lock:wallet'
}

export const WALLET_LOCK_TTL = 180; // 3 minutes
