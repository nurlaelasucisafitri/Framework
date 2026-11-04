import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorDto {
    @IsOptional()
    @IsString()
    @MaxLength(150)
    name?: string;
}
