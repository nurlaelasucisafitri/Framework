import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePublisherDto {
    @IsString({ message: "Name harus berupa teks" })
    @IsNotEmpty({ message: "Name Harus Diisi" })
    @MaxLength(150, { message: "Name maksimal 150 karakter" })
    readonly name: string;
}