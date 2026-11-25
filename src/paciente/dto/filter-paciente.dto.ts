import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPacienteDto {

  @IsOptional()
  @IsString()
  convenio?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsIn(['nome', 'idade', 'cpf'])
  sortBy?: string = 'nome';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string = 'asc';
}