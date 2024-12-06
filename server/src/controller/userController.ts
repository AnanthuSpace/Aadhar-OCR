import { Response } from "express";
import { AddressData, MulterRequest } from "../interface/comment.interface";
import { IUserService } from "../interface/userService.interface";

export class UserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  public async parseAadhar(req: MulterRequest, res: Response): Promise<void> {
    try {
      const files = req.files;

      if (!files || !files.frontpage || !files.backpage) {
        res.status(400).json({ message: "Both frontpage and backpage are required!" });
        return;
      }

      const frontpageBuffer: Buffer = files.frontpage[0]?.buffer;
      const backpageBuffer: Buffer = files.backpage[0]?.buffer;

      if (!frontpageBuffer || !backpageBuffer) {
        res.status(400).json({ message: "Invalid files uploaded!" });
        return;
      }

      const frontpageText: string = await this._userService.getDataFromAadhar(frontpageBuffer);
      const backpageText: string = await this._userService.getDataFromAadhar(backpageBuffer);

      const aadharNumber: string | null = await this._userService.getAadharNumber(frontpageText);
      if (!aadharNumber) {
        res.status(400).json({ status: false, message: "Invalid Aadhar card data!" });
        return;
      }

      const [name, gender, dob, addressData] = await Promise.all([
        this._userService.getName(frontpageText),
        this._userService.getGender(frontpageText),
        this._userService.getDOB(frontpageText),
        this._userService.getAddress(backpageText),
      ]);

      if (typeof addressData === "string") {
        res.status(400).json({ status: false, message: addressData });
        return;
      }

      const { address, pincode }: AddressData = addressData;

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
    } catch (error) {
      console.error("Error during OCR processing:", error);
      res.status(500).json({
        message: "File upload or OCR processing failed",
        error: (error as Error).message,
      });
    }
  }
}
