"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = void 0;
const constants_1 = require("../../constants");
const user_entity_1 = require("../entities/user.entity");
exports.usersRepository = {
    provide: constants_1.USERS_REPOSITORY,
    useValue: user_entity_1.User,
};
//# sourceMappingURL=users.repository.js.map