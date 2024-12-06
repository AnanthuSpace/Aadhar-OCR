"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = exports.notFound = void 0;
const notFound = (req, res) => {
    res.status(404).json({ status: false, msg: "Page not found" });
};
exports.notFound = notFound;
const errorHandle = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal server error" });
};
exports.errorHandle = errorHandle;