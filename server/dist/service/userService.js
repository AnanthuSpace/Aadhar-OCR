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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var tesseract_js_1 = __importDefault(require("tesseract.js"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getDataFromAadhar = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tesseract_js_1.default.recognize(image, "eng")];
                    case 1:
                        text = (_a.sent()).data.text;
                        return [2 /*return*/, text];
                }
            });
        });
    };
    UserService.prototype.getAadharNumber = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var idNumberRegex, match;
            return __generator(this, function (_a) {
                idNumberRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
                match = text.match(idNumberRegex);
                return [2 /*return*/, match ? match[0].replace(/\s/g, "") : null];
            });
        });
    };
    UserService.prototype.getName = function (text) {
        var nameRegex = /(?:\bA\s|=\s?A\s|Name[:\s-]*)([A-Z][a-z]+\s[A-Z][a-z]+)/m;
        var match = text.match(nameRegex);
        return match ? match[1].trim() : null;
    };
    UserService.prototype.getDOB = function (text) {
        var dobRegex = /\s+(\d{2}\/\d{2}\/\d{4})/;
        var match = text.match(dobRegex);
        return match ? match[0] : null;
    };
    UserService.prototype.getGender = function (text) {
        var genderRegex = /MALE|FEMALE|Male|Female|TRANSGENDER/;
        var match = text.match(genderRegex);
        return match ? match[0] : null;
    };
    UserService.prototype.getAddress = function (text) {
        var addressPattern = /,\s*(.+?)\s+Kerala\s*-\s*\d{6}/;
        var cleanedText = text.replace(/[^\x00-\x7F]/g, "").replace(/\s+/g, " ").trim();
        var match = cleanedText.match(addressPattern);
        if (match) {
            var part1 = match[1]
                .replace(/[^a-zA-Z0-9\s,.'-]/g, "")
                .replace(/\s+/g, " ")
                .trim();
            var split = part1.split(" ");
            var filteredWords = split.filter(function (word) { return word.replace(/[^\w]/g, "").length > 5; });
            var code = match[0].match(/\d{6}/);
            if (code) {
                var res = filteredWords.join(", ");
                return { address: "".concat(res, ", ").concat(code[0]), pincode: code[0] };
            }
        }
        return "Address not found";
    };
    return UserService;
}());
exports.UserService = UserService;
