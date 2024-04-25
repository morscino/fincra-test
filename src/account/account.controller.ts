import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AccountService } from "@account/account.service";
import {
  CreateAccountDto,
  FundAccountDto,
  ParamIdDto,
  TransferDto,
} from "@account/dto/account.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("account")
@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: "Create Account" })
  @Post("/")
  async createAccount(@Body() body: CreateAccountDto) {
    return await this.accountService.createAccount(body);
  }

  @ApiOperation({ summary: "Get Single Account" })
  @Get("/:id")
  async getAccount(@Param() param: ParamIdDto) {
    return await this.accountService.getAccount(param.id);
  }

  @ApiOperation({ summary: "Fund Account" })
  @Post("/fund")
  async fundAccount(@Body() body: FundAccountDto) {
    return await this.accountService.fundAccount(body);
  }

  @ApiOperation({ summary: "Bank Transfer" })
  @Post("/transfer")
  async transfer(@Body() body: TransferDto) {
    return await this.accountService.bankTransfer(body);
  }
}
