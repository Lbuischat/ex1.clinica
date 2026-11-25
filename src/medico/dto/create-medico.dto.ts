import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMedicoDto {

  @IsString()
  @IsNotEmpty()
  crm: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEnum(['Cardiologia', 'Ortopedia', 'Pediatria', 'Clínica Geral'])
  especialidade: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorConsulta: number;
}