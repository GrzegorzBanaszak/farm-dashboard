import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const checkForHexRegExp = /^[0-9A-Fa-f]{24}$/;
          return typeof value === 'string' && checkForHexRegExp.test(value);
        },
        defaultMessage() {
          return 'Invalid MongoDB ObjectId';
        },
      },
    });
  };
}
