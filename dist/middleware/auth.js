"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        //const token = req.header('Authorization')?.replace('Bearer ', '');
        const token = req.header('Authorization')?.split(' ')[1];
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
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map