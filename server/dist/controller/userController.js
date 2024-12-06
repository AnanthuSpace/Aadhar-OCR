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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this._userService = userService;
    }
    parseAadhar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const files = req.files;
                if (!files || !files.frontpage || !files.backpage) {
                    res.status(400).json({ message: "Both frontpage and backpage are required!" });
                    return;
                }
                const frontpageBuffer = (_a = files.frontpage[0]) === null || _a === void 0 ? void 0 : _a.buffer;
                const backpageBuffer = (_b = files.backpage[0]) === null || _b === void 0 ? void 0 : _b.buffer;
                if (!frontpageBuffer || !backpageBuffer) {
                    res.status(400).json({ message: "Invalid files uploaded!" });
                    return;
                }
                const frontpageText = yield this._userService.getDataFromAadhar(frontpageBuffer);
                const backpageText = yield this._userService.getDataFromAadhar(backpageBuffer);
                const aadharNumber = yield this._userService.getAadharNumber(frontpageText);
                if (!aadharNumber) {
                    res.status(400).json({ status: false, message: "Invalid Aadhar card data!" });
                    return;
                }
                const [name, gender, dob, addressData] = yield Promise.all([
                    this._userService.getName(frontpageText),
                    this._userService.getGender(frontpageText),
                    this._userService.getDOB(frontpageText),
                    this._userService.getAddress(backpageText),
                ]);
                if (typeof addressData === "string") {
                    res.status(400).json({ status: false, message: addressData });
                    return;
                }
                const { address, pincode } = addressData;
                res.status(200).json({
                    status: true,
                    data: {
                        AadharNumber: aadharNumber,
                        Name: name || "Name not found",
                        Gender: gender || "Gender not found",
                        DOB: dob || "DOB not found",
                        Address: address || "Address not found",
                        Pincode: pincode || "Pincode not found",
                    },
                });
            }
            catch (error) {
                console.error("Error during OCR processing:", error);
                res.status(500).json({
                    message: "File upload or OCR processing failed",
                    error: error.message,
                });
            }
        });
    }
}
exports.UserController = UserController;
