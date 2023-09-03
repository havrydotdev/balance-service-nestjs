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
exports.ReqCreateTransferDto = exports.ReqCreateTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReqCreateTransactionDto {
}
exports.ReqCreateTransactionDto = ReqCreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        title: 'value',
        description: 'Value of transaction in EUR',
        example: 300,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.NotEquals)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReqCreateTransactionDto.prototype, "value", void 0);
class ReqCreateTransferDto {
}
exports.ReqCreateTransferDto = ReqCreateTransferDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        title: 'value',
        description: 'Value of transaction in EUR',
        example: 300,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.NotEquals)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReqCreateTransferDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        title: 'toId',
        description: 'Id of transfer recepient',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.NotEquals)(0),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCreateTransferDto.prototype, "toId", void 0);
class CreateTransactionDto extends ReqCreateTransactionDto {
}
exports.default = CreateTransactionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "desc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['transfer', 'debit', 'top-up']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.NotEquals)(0),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "userId", void 0);
//# sourceMappingURL=create-transaction.dto.js.map