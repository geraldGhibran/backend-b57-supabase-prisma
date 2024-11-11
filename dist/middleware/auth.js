"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //const token = req.header('Authorization')?.replace('Bearer ', '');
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const supabaseSecret = `${process.env.SUPABASE_JWT_SECRET}`;
        if (token) {
            //throw new Error();
            //const checkJwt = jwt.decode(token, { complete: true, json: true });
            jsonwebtoken_1.default.verify(token, supabaseSecret);
        }
        else {
            res.status(401).json({ msg: 'No token, auth denied!' });
        }
        next();
    }
    catch (err) {
        return res.status(400).json({ error: 'Invalid token, auth denied!' });
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map