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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
let Transaction = class Transaction extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        nullable: false,
        description: 'Transaction id',
        example: 1,
    }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: false,
        description: 'Transaction description',
        example: 'Debit by purchase 300EUR',
    }),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transaction.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        nullable: false,
        description: 'Transaction value',
        example: 300,
    }),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaction.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['transfer', 'debit', 'top-up'],
        nullable: false,
        description: 'Transaction type',
        enumName: 'TransactionType',
        example: 'transfer',
    }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM('transfer', 'debit', 'top-up')),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        nullable: false,
        description: 'Transaction owner`s id',
        example: 1,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaction.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        nullable: true,
        description: "Transaction owner's id (isn't returned with transactions)",
    }),
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Transaction.prototype, "user", void 0);
Transaction = __decorate([
    sequelize_typescript_1.Table
], Transaction);
exports.default = Transaction;
//# sourceMappingURL=transaction.entity.js.map