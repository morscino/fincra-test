import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUUID, Length, Validate } from "class-validator";

import { MoneyAmount } from "@common/decorators";
import { Currency } from "@common/enums";
import { Utils } from "@common/utils";
export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 25)
    last_name:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 25)
    first_name:string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    @IsNotEmpty()
    @Length(13)
    phone_number:string;

    @ApiProperty({ example: Currency.NGN, enum: Currency })
    @IsEnum(Currency)
    currency:Currency;
}

export class ParamIdDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id:string;
}

export class FundAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10)
    account_number:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 25)
    sender_account_name:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10)
    sender_account_number:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 25)
    sender_bank_name:string;

    @ApiProperty()
    @Transform((v) => Utils.safeNumber(v.value))
    @Validate(MoneyAmount)
    amount:number;

    @ApiProperty({ example: Currency.NGN, enum: Currency })
    @IsEnum(Currency)
    currency:Currency;
}

export class TransferDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10)
    account_number:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 25)
    beneficiary_account_name:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10)
    beneficiary_account_number:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 25)
    beneficiary_bank_name:string;

    @ApiProperty()
    @Transform((v) => Utils.safeNumber(v.value))
    @Validate(MoneyAmount)
    amount:number;

    @ApiProperty({ example: Currency.NGN, enum: Currency })
    @IsEnum(Currency)
    currency:Currency;
}

