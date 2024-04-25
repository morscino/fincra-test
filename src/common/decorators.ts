import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, isInt, isPositive } from "class-validator";


@ValidatorConstraint({ name: 'moneyAmount', async: false })
export class MoneyAmount implements ValidatorConstraintInterface {
    validate(amount: number, args: ValidationArguments) {
        return this.validateAmount(amount);
    }

    validateAmount(value: number) {
        return isInt(value) && isPositive(value);
    }

    defaultMessage(validationArguments: ValidationArguments) {
        return `${validationArguments.property} must be a valid money amount`;
    }
}