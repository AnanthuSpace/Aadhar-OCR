import { Request } from "express";

export interface AddressData {
    address: string;
    pincode: string;
}

export interface MulterRequest extends Request {
    files: {
      [fieldname: string]: Express.Multer.File[];
    };
  }