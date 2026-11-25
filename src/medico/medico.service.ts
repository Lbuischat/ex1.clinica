import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  Logger
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Medico } from './schemas/medico.schema';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { FilterMedicoDto } from './dto/filter-medico.dto';

@Injectable()
export class MedicoService {

  private readonly logger = new Logger(MedicoService.name);

  constructor(
    @InjectModel(Medico.name)
    private medicoModel: Model<Medico>,
  ) { }

  async create(dto: CreateMedicoDto) {
    try {
      const medico = new this.medicoModel(dto);
      return await medico.save();

    } catch (error: unknown) {
      this.logger.error('Erro ao cadastrar médico', error);

      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
        throw new ConflictException('CRM já cadastrado');
      }

      if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'ValidationError' && 'message' in error) {
        throw new BadRequestException(String(error.message));
      }

      throw error;
    }
  }

  async findAll(filters: FilterMedicoDto) {

    const {
      especialidade,
      minValor,
      maxValor,
      page = 1,
      limit = 10,
      sortBy = 'nome',
      order = 'asc'
    } = filters;

    const query: any = {};

    if (especialidade) {
      query.especialidade = especialidade;
    }

    if (minValor !== undefined || maxValor !== undefined) {
      query.valorConsulta = {};

      if (minValor !== undefined) {
        query.valorConsulta.$gte = minValor;
      }

      if (maxValor !== undefined) {
        query.valorConsulta.$lte = maxValor;
      }
    }

    return this.medicoModel
      .find(query)
      .select('-__v')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(id: string) {
    const medico = await this.medicoModel
      .findById(id)
      .select('-__v');

    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    return medico;
  }
}