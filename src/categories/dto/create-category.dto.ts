import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: "Name harus berupa teks" })
    @IsNotEmpty({ message: "Name Harus Diisi" })
    @MaxLength(100, { message: "Name maksimal 100 karakter" })
    readonly name: string;
}