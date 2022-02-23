import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  @IsString({ message: 'Email phải là chuỗi' })
  @IsEmail({ message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @Length(6, 120, { message: 'Mật khẩu phải từ 6 đến 120 kí tự' })
  password: string;
}
