export declare class ReqCreateTransactionDto {
    value: number;
}
export declare class ReqCreateTransferDto {
    value: number;
    toId: number;
}
export default class CreateTransactionDto extends ReqCreateTransactionDto {
    desc: string;
    type: TransactionType;
    userId: number;
}
