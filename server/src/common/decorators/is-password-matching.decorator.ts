import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsPasswordMatching(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPasswordMatching',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          return object.password === object.confirmPassword;
        },
        defaultMessage() {
          return 'Hasła nie są identyczne';
        },
      },
    });
  };
}
