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
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const users_service_1 = require("../../users/services/users/users.service");
let TransactionsHooks = class TransactionsHooks {
    constructor(transactionsRepo, usersService) {
        this.transactionsRepo = transactionsRepo;
        this.usersService = usersService;
    }
    onModuleInit() {
        this.transactionsRepo.afterSave('update_balance', async (trs, options) => {
            if (!options.validate) {
                return;
            }
            const rowsAffected = await this.usersService.updateBalance(trs.userId, trs.value);
            if (rowsAffected === 0) {
                const rowsAff = await this.transactionsRepo.destroy({
                    where: {
                        id: trs.id,
                    },
                });
                if (rowsAff === 0) {
                    throw new Error('No rows affected during balance update and failed to delete transaction');
                }
                throw new Error('No rows affected during balance update');
            }
        });
    }
};
TransactionsHooks = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTIONS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], TransactionsHooks);
exports.default = TransactionsHooks;
//# sourceMappingURL=transactions.hooks.js.map