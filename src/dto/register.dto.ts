import { Trim } from 'class-sanitizer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Length,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { IsMatch } from '../validators/is-match.validator';
import { IsUnique } from '../validators/is-unique.validator';

export class RegisterDTO {
  @Trim()
  @IsNotEmpty({ message: 'Họ tên không được bỏ trống' })
  @IsString({ message: 'Họ tên phải là chuỗi' })
  @MinLength(3, { message: 'Họ tên phải từ 3 kí tự' })
  @MaxLength(150, { message: 'Họ tên không được quá 150 kí tự' })
  fullName: string;

  @Trim()
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  @IsString({ message: 'Email phải là chuỗi' })
  @IsEmail({ message: 'Email không hợp lệ' })
  @IsUnique(User, { message: 'Emal đã được sử dụng' })
  email: string;

  @Trim()
  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @Length(6, 120, { message: 'Mật khẩu phải từ 6 đến 120 kí tự' })
  password: string;

  @Trim()
  @IsNotEmpty({ message: 'Mật khẩu xác nhận không được bỏ trống' })
  @IsString({ message: 'Mật khẩu xác nhận phải là chuỗi' })
  @Length(6, 120, { message: 'Mật khẩu xác nhận phải từ 6 đến 120 kí tự' })
  @IsMatch('password', { message: 'Mật khẩu xác nhận không khớp' })
  repassword: string;
}
