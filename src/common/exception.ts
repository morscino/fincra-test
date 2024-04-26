import { HttpException, HttpStatus } from "@nestjs/common";
import { AppStatus } from "./enums";
import { error } from "console";

export class AppException extends HttpException {
    static FORBIDDEN: any;
    constructor(
        code?: string,
        status: number = HttpStatus.SERVICE_UNAVAILABLE,
    ) {
        super( code, status);
    }
}