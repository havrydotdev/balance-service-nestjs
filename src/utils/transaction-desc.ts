const genDebitDesc = (value: number): string => {
  return `Debit by purchase ${value}EUR`;
};

const genTopUpDesc = (value: number): string => {
  return `Top-up by purchase ${value}EUR`;
};

const genTransferToDesc = (value: number, toUsername: string): string => {
  return `Debit by transfer ${value} to user ${toUsername}`;
};

const genTransferFromDesc = (value: number, fromUsername: string): string => {
  return `Top-Up by transfer ${value} from user ${fromUsername}`;
};

export { genDebitDesc, genTopUpDesc, genTransferFromDesc, genTransferToDesc };
