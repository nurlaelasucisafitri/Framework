import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePublisherDto {
    @IsOptional()
    @IsString({ message: "Name harus berupa teks" })
    @MaxLength(150, { message: "Name maksimal 150 karakter" })
    readonly name?: string;
}