import {
    Controller, Post, Get, Body, Param, Query,
    Res, HttpCode, HttpStatus
} from '@nestjs/common';

import type { Response } from 'express';

import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { FilterConsultaDto } from './dto/filter-consulta.dto';

@Controller('consultas')
export class ConsultaController {

    constructor(
        private readonly consultaService: ConsultaService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateConsultaDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const consulta = await this.consultaService.create(dto);

        res.location(`/consultas/${consulta._id}`);

        return consulta;
    }

    @Get()
    findAll(@Query() filters: FilterConsultaDto) {
        return this.consultaService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.consultaService.findOne(id);
    }
}