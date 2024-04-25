import { customAlphabet } from "nanoid";
import * as crypto from "crypto";
import * as _ from "lodash";

export class Utils {
  public static generateRandomID(length: number): string {
    return crypto.randomBytes(length / 2).toString("hex");
  }

  static generateRandomAccountNumber(): string {
    return this.generateRandom(10, "0123456789");
  }

  static genRandomReference(length: number = 12): string {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return this.generateRandom(length, characters);
  }

  static safeNumber(num: any) {
    if (num === null || (typeof num === 'string' && num.trim() === '')) {
        return null;
    }
    return !isNaN(num) ? Number(num) : null;
}

  static generateRandom(length: number, characters: string) {
    let result = "";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
