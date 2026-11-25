import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  IsEnum,
  IsBoolean
} from 'class-validator';

export class CreatePacienteDto {

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @Min(0)
  idade: number;

  @IsOptional()
  @IsEnum(['Particular', 'Unimed', 'Bradesco', 'SUS'])
  convenio?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}