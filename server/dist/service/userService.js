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
exports.UserService = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
class UserService {
    getDataFromAadhar(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { text }, } = yield tesseract_js_1.default.recognize(image, "eng");
            return text;
        });
    }
    getAadharNumber(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const idNumberRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
            const match = text.match(idNumberRegex);
            return match ? match[0].replace(/\s/g, "") : null;
        });
    }
    getName(text) {
        const nameRegex = /(?:\bA\s|=\s?A\s|Name[:\s-]*)([A-Z][a-z]+\s[A-Z][a-z]+)/m;
        const match = text.match(nameRegex);
        return match ? match[1].trim() : null;
    }
    getDOB(text) {
        const dobRegex = /\s+(\d{2}\/\d{2}\/\d{4})/;
        const match = text.match(dobRegex);
        return match ? match[0] : null;
    }
    getGender(text) {
        const genderRegex = /MALE|FEMALE|Male|Female|TRANSGENDER/;
        const match = text.match(genderRegex);
        return match ? match[0] : null;
    }
    getAddress(text) {
        const addressPattern = /,\s*(.+?)\s+Kerala\s*-\s*\d{6}/;
        const cleanedText = text.replace(/[^\x00-\x7F]/g, "").replace(/\s+/g, " ").trim();
        const match = cleanedText.match(addressPattern);
        if (match) {
            const part1 = match[1]
                .replace(/[^a-zA-Z0-9\s,.'-]/g, "")
                .replace(/\s+/g, " ")
                .trim();
            const split = part1.split(" ");
            const filteredWords = split.filter((word) => word.replace(/[^\w]/g, "").length > 5);
            const code = match[0].match(/\d{6}/);
            if (code) {
                const res = filteredWords.join(", ");
                return { address: `${res}, ${code[0]}`, pincode: code[0] };
            }
        }
        return "Address not found";
    }
}
exports.UserService = UserService;
