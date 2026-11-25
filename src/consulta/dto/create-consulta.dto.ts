import {
  IsString, IsNotEmpty, IsMongoId,
  IsNumber, Min, IsOptional, IsEnum
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateConsultaDto {

  @IsString()
  @IsNotEmpty()
  codigoAtendimento: string;

  @IsMongoId()
  pacienteId: string;

  @IsMongoId()
  medicoId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorCobrado: number;

  @IsOptional()
  @IsEnum(['Agendada', 'Realizada', 'Cancelada'])
  status?: string;
}