import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { Query } from '@nestjs/common';

import type { Response } from 'express';

import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { FilterPacienteDto } from './dto/filter-paciente.dto';

@Controller('pacientes')
export class PacienteController {

  constructor(
    private readonly pacienteService: PacienteService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreatePacienteDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const paciente = await this.pacienteService.create(dto);

    res.location(`/pacientes/${paciente._id}`);

    return paciente;
  }

  @Get()
  findAll(@Query() filters: FilterPacienteDto) {
    return this.pacienteService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacienteService.findOne(id);
  }
}