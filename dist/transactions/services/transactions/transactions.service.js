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
var TransactionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constants_1 = require("../../../constants");
let TransactionsService = TransactionsService_1 = class TransactionsService {
    constructor(transactionsRepo, httpService) {
        this.transactionsRepo = transactionsRepo;
        this.httpService = httpService;
        this.logger = new common_1.Logger(TransactionsService_1.name);
    }
    async getRates(to) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`http://api.exchangeratesapi.io/v1/latest?access_key=${constants_1.EXCHANGES_API_KEY}&base=EUR&symbols=${to}`)
            .pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
        })));
        return response.data.rates;
    }
    async findAllByUser(userId) {
        return this.transactionsRepo.findAll({
            where: { userId: userId },
        });
    }
    async findById(id, userId) {
        const transaction = await this.transactionsRepo.findByPk(id);
        if (transaction.userId !== userId) {
            throw new common_1.UnauthorizedException({
                message: 'You don`t have access to this transaction',
            });
        }
        return transaction;
    }
    async create(dto) {
        const transaction = await this.transactionsRepo.create({
            ...dto,
        });
        return transaction;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = TransactionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTIONS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map