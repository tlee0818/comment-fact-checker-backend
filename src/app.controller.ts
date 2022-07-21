import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService, EntityAnalysisService } from './app.service';
import { QueryRelevantFacts } from './queryRelevantFacts.dto';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) { }

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

@Controller()
export class EntityAnalysisController {
  constructor(private configService: ConfigService, private readonly appService: EntityAnalysisService) { }

  @Post("/factcheck")
  relevantFacts(@Body() relevantFactsDto: QueryRelevantFacts): any {
    const apiKey = this.configService.get<string>('FACT_CHECK_API_KEY');

    return this.appService.queryFactCheck(relevantFactsDto.texts, "en-US", apiKey);
  }

  @Get("getEntities")
  getEntities(@Query() query: { text: string }): Promise<[any, any, {}]> {

    return this.appService.analyzeEntities(query.text);
  }
}

