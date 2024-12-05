"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendEmail = (toEmail, code) => {
    if (!toEmail || !code) {
        console.log("Email or code was NULL - unable to send email");
        return;
    }
    const email = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!email || !pass) {
        console.log("Unable to load email or password from env file");
        return;
    }
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: pass,
        },
    });
    const mailOptions = {
        from: "nivalaerik04@gmail.com",
        to: toEmail,
        subject: "Password reset.",
        text: code,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.SendEmail = SendEmail;
