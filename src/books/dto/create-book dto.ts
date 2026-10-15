import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDto{
    @IsNotEmpty ({message:"Title Harus Diisi"})
    readonly title: string;

    @IsNotEmpty ({message:"Author Harus Diisi"})
    readonly author: string;

    @IsNotEmpty ({message:"ISBN Harus Diisi"})
    readonly isbn: string;

    @IsNotEmpty ({message:"Title Harus Diisi"})
    @IsInt ({message:"Published Year harus berupa angka"})
    readonly publishedYear: number;
}