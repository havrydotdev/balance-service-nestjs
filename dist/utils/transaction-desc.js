"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genTransferToDesc = exports.genTransferFromDesc = exports.genTopUpDesc = exports.genDebitDesc = void 0;
const genDebitDesc = (value) => {
    return `Debit by purchase ${value}EUR`;
};
exports.genDebitDesc = genDebitDesc;
const genTopUpDesc = (value) => {
    return `Top-up by purchase ${value}EUR`;
};
exports.genTopUpDesc = genTopUpDesc;
const genTransferToDesc = (value, toUsername) => {
    return `Debit by transfer ${value} to user ${toUsername}`;
};
exports.genTransferToDesc = genTransferToDesc;
const genTransferFromDesc = (value, fromUsername) => {
    return `Top-Up by transfer ${value} from user ${fromUsername}`;
};
exports.genTransferFromDesc = genTransferFromDesc;
//# sourceMappingURL=transaction-desc.js.map