import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty({ message: 'Title Harus Diisi' })
    @MaxLength(150)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(45)
    isbn?: string;

    @IsOptional()
    @IsInt()
    @Min(1000)
    @Max(2100)
    published_year?: number;

    @IsOptional()
    @IsBoolean()
    is_available?: boolean;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsUUID()
    category_id?: string;

    @IsOptional()
    @IsUUID()
    publisher_id?: string;
}
