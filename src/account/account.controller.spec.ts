import { Test, TestingModule } from "@nestjs/testing";
import { AccountController } from "@account/account.controller";
import { AccountService } from "@account/account.service";
import { CreateAccountDto } from "@account/dto/account.dto";
import { MockHelper } from "@common/mock";
import { Currency } from "@common/enums";
import { accounts } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

describe("AccountController", () => {
  let controller: AccountController;
  const res = { code: "success", message: "Request Successful" };
  const mockAccount = MockHelper.mockAccount();
  const mockTransaction = MockHelper.mockTransaction();
  const fundTransferResponse = {
    ...res,
    data: mockTransaction,
  };
  const createAccountResponse = {
    ...res,
    data: mockAccount,
  };
  beforeEach(async () => {
    const mockAccountService = {
      createAccount: jest
        .fn()
        .mockImplementation((data: CreateAccountDto) =>
          Promise.resolve(createAccountResponse)
        ),
      getAccount: jest
        .fn()
        .mockImplementation((id: string) => Promise.resolve(mockAccount)),
      fundAccount: jest
        .fn()
        .mockImplementation(() => Promise.resolve(fundTransferResponse)),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    })
      .overrideProvider(AccountService)
      .useValue(mockAccountService)
      .compile();

    controller = module.get<AccountController>(AccountController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a new account", async () => {
    const res = await controller.createAccount({
      last_name: "Dada",
      first_name: "Babatunde",
      phone_number: "+2348176129236",
      currency: Currency.NGN,
    });

    expect(res).toEqual(createAccountResponse);
  });

  it("should throw when the wrong format of phone number is supplied.", async () => {
    const createAccountDto = plainToInstance(CreateAccountDto, {
      last_name: "Dada",
      first_name: "Babatunde",
      phone_number: "+23481761292",
      currency: Currency.NGN,
    });
    const errors = await validate(createAccountDto);
    expect(errors.length).not.toBe(0);
    expect(errors[0].toString(false, false, "", true)).toContain(
      `phone_number must be longer than or equal to 13 characters`
    );
    expect(errors[0].toString(false, false, "", true)).toContain(
      ` phone_number must be a valid phone number`
    );
  });

  it("should throw when the wrong currency is supplied.", async () => {
    const createAccountDto = plainToInstance(CreateAccountDto, {
      last_name: "Dada",
      first_name: "Babatunde",
      phone_number: "+2348176129236",
      currency: "USD",
    });
    const errors = await validate(createAccountDto);
    expect(errors.length).not.toBe(0);
    expect(errors[0].toString(false, false, "", true)).toContain(
      `currency must be one of the following values: NGN`
    );
  });

  it("should throw when last name and first name less than 3 characters.", async () => {
    const createAccountDto = plainToInstance(CreateAccountDto, {
      last_name: "a",
      first_name: "b",
      phone_number: "+2348176129236",
      currency: Currency.NGN,
    });
    const errors = await validate(createAccountDto);
    expect(errors.length).not.toBe(0);
    expect(errors[0].toString(false, false, "", true)).toContain(
      `last_name must be longer than or equal to 3 characters`
    );
    expect(errors[1].toString(false, false, "", true)).toContain(
      `first_name must be longer than or equal to 3 characters`
    );
  });

  it("should fetch account", async () => {
    const res = await controller.getAccount({
      id: "907936ff-044a-48b3-a6cb-cc4d12c2f78b",
    });
    expect(res.id).toEqual(mockAccount.id);
    expect(res.wallet).toEqual(mockAccount.wallet);
    expect(res).toEqual(mockAccount);
  });

  it("should fund an account", async () => {
    const res = await controller.fundAccount({
      account_number: "4179552479",
      sender_account_name: "Jaiye Olu",
      sender_account_number: "1025389585",
      sender_bank_name: "UBA plc",
      currency: Currency.NGN,
      amount: 50000,
    });

    expect(res).toEqual(fundTransferResponse);
  });
});
