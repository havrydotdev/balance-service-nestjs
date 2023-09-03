"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRepository = void 0;
const constants_1 = require("../../constants");
const transaction_entity_1 = require("../entities/transaction.entity");
exports.transactionsRepository = {
    provide: constants_1.TRANSACTIONS_REPOSITORY,
    useValue: transaction_entity_1.default,
};
//# sourceMappingURL=transactions.repository.js.map