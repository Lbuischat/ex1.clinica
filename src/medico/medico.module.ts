import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicoController } from './medico.controller';
import { MedicoService } from './medico.service';
import { Medico, MedicoSchema } from './schemas/medico.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medico.name, schema: MedicoSchema }
    ])
  ],
  controllers: [MedicoController],
  providers: [MedicoService],
})
export class MedicoModule {}