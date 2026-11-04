import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString({ message: "Name harus berupa teks" })
    @MaxLength(100, { message: "Name maksimal 100 karakter" })
    readonly name?: string;
}