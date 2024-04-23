import { Controller, Get } from '@nestjs/common';
import { AdvicesService } from './advices.service';

@Controller('advices')
export class AdvicesController {
  constructor(private readonly advicesService: AdvicesService) {}

  @Get()
  getAdvices() {
    return this.advicesService.getAdvices();
  }
}
