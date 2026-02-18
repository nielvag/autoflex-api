import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumberString,
  Matches,
} from 'class-validator';

export class CreateRawMaterialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsNumberString()
  @Matches(/^\d+(\.\d{1,3})?$/, {
    message: 'quantidade em estoque precisa ter 3 casas decimais',
  })
  stockQuantity: string;
}
