import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  firstName: string | null;
  @Expose()
  lastName: string | null;
}
