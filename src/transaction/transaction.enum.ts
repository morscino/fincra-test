export enum TransactionMode{
    Credit = 'credit',
    Debit = 'debit'
}

export enum TransactionType {
    AccountFunding = 'account-funding',
    AccountTransfer = 'account-transfer',
    BankTransfer = 'bank-transfer'
}

export enum TransactionStatus{
    Pending = 'pending',
    Success = 'success',
    Failed = 'failed'
}