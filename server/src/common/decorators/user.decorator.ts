import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../../user/interfaces/user.interface';

export const User = createParamDecorator(
  (data: keyof IUser | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    if (data && request.user) {
      return request.user[data];
    }
    return request.user;
  },
);
