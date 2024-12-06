import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response): void => {
    res.status(404).json({ status: false, msg: "Page not found" });
};

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal server error" });
};
