"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
const encodePassword = (raw) => {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(raw, SALT);
};
exports.encodePassword = encodePassword;
const comparePasswords = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
};
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=bcrypt.js.map