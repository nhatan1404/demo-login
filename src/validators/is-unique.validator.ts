import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BaseEntity, getRepository } from 'typeorm';

type Entity = typeof BaseEntity;

@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    const { property, value } = validationArguments;
    return `${property} với giá trị bằng '${value}' đã được sử dụng`;
  }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const entity = args.constraints[0];
    const service = getRepository(entity);
    const data = await service.findOne({
      [args.property]: value,
    });
    return !data;
  }
}

export function IsUnique(
  property: Entity,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsUniqueConstraint,
    });
  };
}
