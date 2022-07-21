import { Module } from '@nestjs/common';
import { EntityAnalysisController } from './app.controller';
import { EntityAnalysisService } from './app.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EntityAnalysisController],
  providers: [EntityAnalysisService],
})
export class AppModule { }
