import { IsOptional, IsEnum, IsNumber, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterMedicoDto {

  @IsOptional()
  @IsEnum(['Cardiologia', 'Ortopedia', 'Pediatria', 'Clínica Geral'])
  especialidade?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minValor?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxValor?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsIn(['nome', 'valorConsulta', 'especialidade'])
  sortBy?: string = 'nome';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string = 'asc';
}