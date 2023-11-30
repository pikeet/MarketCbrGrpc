import { Module } from '@nestjs/common';
import { CbrService } from './cbr.service';
import { CbrController } from './cbr.controller';
import { DatabaseModule } from 'src/database/databse.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [CbrController],
  providers: [CbrService],
})
export class CbrModule {}
