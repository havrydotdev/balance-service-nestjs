declare const genDebitDesc: (value: number) => string;
declare const genTopUpDesc: (value: number) => string;
declare const genTransferToDesc: (value: number, toUsername: string) => string;
declare const genTransferFromDesc: (value: number, fromUsername: string) => string;
export { genDebitDesc, genTopUpDesc, genTransferFromDesc, genTransferToDesc };
