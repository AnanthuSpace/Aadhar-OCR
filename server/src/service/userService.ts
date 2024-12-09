import tesseract from "tesseract.js";
import { AddressData } from "../interface/comment.interface";

export class UserService {
  public async getDataFromAadhar(image: Buffer): Promise<string> {
    const {
      data: { text },
    } = await tesseract.recognize(image, "eng");
    return text;
  }

  public async getAadharNumber(text: string): Promise<string | null> {
    const idNumberRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
    const match = text.match(idNumberRegex);
    return match ? match[0].replace(/\s/g, "") : null;
  }

  public getName(text: string): string | null {
    const nameRegex = /(?:\bA\s|=\s?A\s|Name[:\s-]*)([A-Z][a-z]+\s[A-Z][a-z]+)/m;
    const match = text.match(nameRegex);
    return match ? match[1].trim() : null;
  }

  public getDOB(text: string): string | null {
    const dobRegex = /\s+(\d{2}\/\d{2}\/\d{4})/;
    const match = text.match(dobRegex);
    return match ? match[0] : null;
  }

  public getGender(text: string): string | null {
    const genderRegex = /MALE|FEMALE|Male|Female|TRANSGENDER/;
    const match = text.match(genderRegex);
    return match ? match[0] : null;
  }

  public getAddress(text: string): AddressData | string {
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
        const result = filteredWords.join(", ");
        return { address: `${result}, ${code[0]}`, pincode: code[0] };
      }
    }

    return "Address not found";
  }
}
