import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('status')
export class StatusController {
  @Get()
  getHello(): string {
    return 'Acredita que ta funcionando kk, primeira coisa que eu fiz'
  }
}
