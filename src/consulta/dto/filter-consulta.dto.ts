import {
  IsOptional, IsEnum, IsNumber,
  IsIn, Min, IsInt
} from 'class-validator';

import { Type } from 'class-transformer';

export class FilterConsultaDto {

  @IsOptional()
  @IsEnum(['Agendada', 'Realizada', 'Cancelada'])
  status?: string;

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
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsIn(['valorCobrado', 'status', 'codigoAtendimento'])
  sortBy?: string = 'codigoAtendimento';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string = 'asc';
}