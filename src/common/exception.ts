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

    // public static get REQUEST_TIMEOUT() {
    //     return new this(
    //         null,
    //         'Request Timed out',
    //         AppStatus.RequestTimeout,
    //     );
    // }
}