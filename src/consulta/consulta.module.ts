import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConsultaController } from './consulta.controller';
import { ConsultaService } from './consulta.service';

import { Consulta, ConsultaSchema } from './schemas/consulta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consulta.name, schema: ConsultaSchema }
    ])
  ],
  controllers: [ConsultaController],
  providers: [ConsultaService],
})
export class ConsultaModule {}