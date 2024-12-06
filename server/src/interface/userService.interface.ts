import { AddressData } from "../interface/comment.interface";

export interface IUserService {
    getDataFromAadhar(image: Buffer): Promise<string>;
    getAadharNumber(text: string): Promise<string | null>;
    getName(text: string): string | null;
    getDOB(text: string): string | null;
    getGender(text: string): string | null;
    getAddress(text: string): AddressData | string;
}
