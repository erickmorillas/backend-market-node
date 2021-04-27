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
exports.sendmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendmail = (email, message) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "aican.oficial@gmail.com",
            pass: "Aican123.",
        },
    });
    const mailOptions = {
        from: "Haciendola <aican.oficial@gmail.com>",
        to: email,
        subject: "Recuperar contraseña",
        html: message,
        text: message,
    };
    return transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return { message: "error" + err.message };
        }
        return { message: "email sent" };
    });
});
exports.sendmail = sendmail;
