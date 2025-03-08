import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'Hasło' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
