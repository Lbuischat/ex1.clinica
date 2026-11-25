import {
  Controller, Post, Get, Body, Param, Query,
  Res, HttpCode, HttpStatus
} from '@nestjs/common';

import type { Response } from 'express';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { FilterMedicoDto } from './dto/filter-medico.dto';

@Controller('medicos')
export class MedicoController {

  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateMedicoDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const medico = await this.medicoService.create(dto);
    res.location(`/medicos/${medico._id}`);
    return medico;
  }

  @Get()
  findAll(@Query() filters: FilterMedicoDto) {
    return this.medicoService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicoService.findOne(id);
  }
}