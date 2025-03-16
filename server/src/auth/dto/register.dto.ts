import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsPasswordMatching } from 'src/common/decorators/is-password-matching.decorator';

export class RegisterDto {
  @ApiProperty({ description: 'Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'Hasło' })
  @IsString()
  @MinLength(8, { message: 'Hasło musi zawierać co najmniej 8 znaków' })
  @Matches(/[a-z]/, {
    message: 'Hasło musi zawierać co najmniej jedną małą literę',
  })
  @Matches(/[A-Z]/, {
    message: 'Hasło musi zawierać co najmniej jedną dużą literę',
  })
  @Matches(/[0-9]/, { message: 'Hasło musi zawierać co najmniej jedną cyfrę' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Potwierdzenie hasła' })
  @IsString()
  @IsPasswordMatching()
  confirmPassword: string;
}
