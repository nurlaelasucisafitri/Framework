import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty({ message: 'Name harus diisi' })
    @MaxLength(150)
    name: string;
}
