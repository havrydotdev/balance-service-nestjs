"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_transaction_dto_1 = require("../../dto/create-transaction.dto");
const transaction_entity_1 = require("../../entities/transaction.entity");
const transactions_service_1 = require("../../services/transactions/transactions.service");
const users_service_1 = require("../../../users/services/users/users.service");
const transaction_desc_1 = require("../../../utils/transaction-desc");
let TransactionsController = class TransactionsController {
    constructor(transactionsService, usersService) {
        this.transactionsService = transactionsService;
        this.usersService = usersService;
    }
    async createTopUp(req, dto) {
        return this.transactionsService.create({
            userId: req.user.id,
            type: 'top-up',
            desc: (0, transaction_desc_1.genTopUpDesc)(dto.value),
            value: dto.value,
        });
    }
    async createDebit(req, dto) {
        return this.transactionsService.create({
            userId: req.user.id,
            type: 'debit',
            desc: (0, transaction_desc_1.genDebitDesc)(dto.value),
            value: -dto.value,
        });
    }
    async createTransfer(req, dto) {
        const from = await this.usersService.findById(req.user.id);
        const to = await this.usersService.findById(dto.toId);
        const tr = await this.transactionsService.create({
            desc: (0, transaction_desc_1.genTransferToDesc)(dto.value, to.name),
            userId: req.user.id,
            type: 'transfer',
            value: -dto.value,
        });
        await this.transactionsService.create({
            desc: (0, transaction_desc_1.genTransferFromDesc)(dto.value, from.name),
            userId: dto.toId,
            type: 'transfer',
            value: dto.value,
        });
        return tr;
    }
    async getAllByUser(req, curr) {
        const transactions = await this.transactionsService.findAllByUser(req.user.id);
        if (curr) {
            const res = await this.transactionsService.getRates(curr);
            transactions.forEach((tr) => (tr.value *= res.rates[curr]));
        }
        return transactions;
    }
    async getById(req, id, curr) {
        const tr = await this.transactionsService.findById(id, req.user.id);
        if (curr) {
            const res = await this.transactionsService.getRates(curr);
            tr.value *= res[curr];
        }
        return tr;
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)('top-up'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.ReqCreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createTopUp", null);
__decorate([
    (0, common_1.Post)('debit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.ReqCreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createDebit", null);
__decorate([
    (0, common_1.Post)('transfer'),
    (0, swagger_1.ApiResponse)({
        type: 'Transaction',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.ReqCreateTransferDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createTransfer", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'currency',
        required: false,
        example: 'UAH',
        description: 'Currency that api will convert all transactions values to (defaults to EUR)',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('currency')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getAllByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiQuery)({
        name: 'currency',
        required: false,
        example: 'UAH',
        description: 'Currency that api will convert all transactions values to (defaults to EUR)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: transaction_entity_1.default,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('currency')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getById", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService,
        users_service_1.UsersService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map