import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  Logger
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Paciente } from './schemas/paciente.schema';
import { FilterPacienteDto } from './dto/filter-paciente.dto';

@Injectable()
export class PacienteService {

  private readonly logger = new Logger(PacienteService.name);

  constructor(
    @InjectModel(Paciente.name)
    private pacienteModel: Model<Paciente>,
  ) {}

  async create(dto: Partial<Paciente>) {
    try {
      const paciente = new this.pacienteModel(dto);
      return await paciente.save();

    } catch (error: unknown) {

      this.logger.error('Erro ao cadastrar paciente', error);

      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
        throw new ConflictException('CPF já cadastrado');
      }

      if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'ValidationError') {
        const message = 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'Dados inválidos';
        throw new BadRequestException(message);
      }

      throw error;
    }
  }

  async findAll(filters: FilterPacienteDto) {

    const {
      convenio,
      nome,
      page = 1,
      limit = 10,
      sortBy = 'nome',
      order = 'asc'
    } = filters;

    const query: any = {};

    if (convenio) {
      query.convenio = convenio;
    }

    if (nome) {
      const escapedNome = nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.nome = { $regex: escapedNome, $options: 'i' };
    }

    return this.pacienteModel
      .find(query)
      .select('-__v')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(id: string) {
    const paciente = await this.pacienteModel
      .findById(id)
      .select('-__v');

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return paciente;
  }
}