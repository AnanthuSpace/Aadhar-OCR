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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this._userService = userService;
    }
    UserController.prototype.parseAadhar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var files, frontpageBuffer, backpageBuffer, frontpageText, backpageText, aadharNumber, _a, name_1, gender, dob, addressData, address, pincode, error_1;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        files = req.files;
                        if (!files || !files.frontpage || !files.backpage) {
                            res.status(400).json({ message: "Both frontpage and backpage are required!" });
                            return [2 /*return*/];
                        }
                        frontpageBuffer = (_b = files.frontpage[0]) === null || _b === void 0 ? void 0 : _b.buffer;
                        backpageBuffer = (_c = files.backpage[0]) === null || _c === void 0 ? void 0 : _c.buffer;
                        if (!frontpageBuffer || !backpageBuffer) {
                            res.status(400).json({ message: "Invalid files uploaded!" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this._userService.getDataFromAadhar(frontpageBuffer)];
                    case 1:
                        frontpageText = _d.sent();
                        return [4 /*yield*/, this._userService.getDataFromAadhar(backpageBuffer)];
                    case 2:
                        backpageText = _d.sent();
                        return [4 /*yield*/, this._userService.getAadharNumber(frontpageText)];
                    case 3:
                        aadharNumber = _d.sent();
                        if (!aadharNumber) {
                            res.status(400).json({ status: false, message: "Invalid Aadhar card data!" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all([
                                this._userService.getName(frontpageText),
                                this._userService.getGender(frontpageText),
                                this._userService.getDOB(frontpageText),
                                this._userService.getAddress(backpageText),
                            ])];
                    case 4:
                        _a = _d.sent(), name_1 = _a[0], gender = _a[1], dob = _a[2], addressData = _a[3];
                        if (typeof addressData === "string") {
                            res.status(400).json({ status: false, message: addressData });
                            return [2 /*return*/];
                        }
                        address = addressData.address, pincode = addressData.pincode;
                        res.status(200).json({
                            status: true,
                            data: {
                                AadharNumber: aadharNumber,
                                Name: name_1 || "Name not found",
                                Gender: gender || "Gender not found",
                                DOB: dob || "DOB not found",
                                Address: address || "Address not found",
                                Pincode: pincode || "Pincode not found",
                            },
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        console.error("Error during OCR processing:", error_1);
                        res.status(500).json({
                            message: "File upload or OCR processing failed",
                            error: error_1.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
