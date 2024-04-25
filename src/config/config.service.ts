import * as Joi from "joi";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { Injectable } from "@nestjs/common";
import { AppException } from "@common/exception";
import { AppStatus } from "@common/enums";


interface EnvConfig {
  [prop: string]: string;
}
const EnvSchema = Joi.object({
  NODE_ENV: Joi.string().valid("dev", "test", "stg").optional().default("dev"),
  PORT: Joi.number().optional().default(8000),
  LOG_LEVEL: Joi.string().default("info"),

  // Redis
  REDIS_URI: Joi.string(),
});

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = ConfigService.getEnvironments();
    this.envConfig = ConfigService.validateInput(config);
  }

  private static getEnvironments() {
    if (this.deployedInCloud()) {
      return process.env;
    }
    return dotenv.parse(fs.readFileSync(".env"));
  }
  private static deployedInCloud() {
    return (
      process.env.NODE_ENV && ["stg", "test"].includes(process.env.NODE_ENV)
    );
  }

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = EnvSchema.validate(envConfig, {
      allowUnknown: true,
      presence: "required",
      stripUnknown: true,
    });
    if (error) {
      throw new AppException(AppStatus.ConfigurationError);
    }
    return validatedEnvConfig;
  }

  get PORT(): number {
    return parseInt(this.envConfig.PORT, 10);
  }

  get LOG_LEVEL(): string {
    return this.envConfig.LOG_LEVEL;
  }

  get REDIS_PORT(): string {
    return this.envConfig.REDIS_PORT;
  }

  get REDIS_URI(): string {
    return this.envConfig.REDIS_URI;
  }

  get APP_ENVIRONMENT() {
    return this.envConfig.APP_ENVIRONMENT;
  }
  get ENABLE_SWAGGER() {
    return /(true|on|1)/gi.test(this.envConfig.ENABLE_SWAGGER);
  }
}
