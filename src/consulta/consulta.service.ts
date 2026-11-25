import {
    Injectable,
    ConflictException,
    BadRequestException,
    NotFoundException,
    Logger
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Consulta } from './schemas/consulta.schema';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { FilterConsultaDto } from './dto/filter-consulta.dto';

@Injectable()
export class ConsultaService {

    private readonly logger = new Logger(ConsultaService.name);

    constructor(
        @InjectModel(Consulta.name)
        private consultaModel: Model<Consulta>,
    ) { }

    async create(dto: CreateConsultaDto) {
        try {
            const consulta = new this.consultaModel(dto);
            return await consulta.save();

        } catch (error) {
            this.logger.error('Erro ao cadastrar consulta', error);

            const mongooseError = error as {
                code?: number;
                name?: string;
                message?: string;
            };

            if (mongooseError.code === 11000) {
                throw new ConflictException('Código de atendimento já cadastrado');
            }

            if (mongooseError.name === 'ValidationError') {
                throw new BadRequestException(mongooseError.message);
            }

            throw error;
        }
    }

    async findAll(filters: FilterConsultaDto) {

        const {
            status,
            minValor,
            maxValor,
            page = 1,
            limit = 10,
            sortBy = 'codigoAtendimento',
            order = 'asc'
        } = filters;

        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (minValor !== undefined || maxValor !== undefined) {
            query.valorCobrado = {};

            if (minValor !== undefined) {
                query.valorCobrado.$gte = minValor;
            }

            if (maxValor !== undefined) {
                query.valorCobrado.$lte = maxValor;
            }
        }

        return this.consultaModel
            .find(query)
            .select('-__v')
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }

    async findOne(id: string) {
        const consulta = await this.consultaModel
            .findById(id)
            .select('-__v');

        if (!consulta) {
            throw new NotFoundException('Consulta não encontrada');
        }

        return consulta;
    }
}