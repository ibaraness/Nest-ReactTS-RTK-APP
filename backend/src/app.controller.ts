import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ExecutionTime } from './common/decorators/execution-time.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ExecutionTime()
  getHello(): string {
    return this.appService.getHello();
  }
}
