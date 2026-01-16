import { Controller, Get} from '@nestjs/common';

@Controller('status')
export class StatusController {
  @Get()
  Mensagem(): string {
    return 'Acredita que ta funcionando kk, primeira coisa que eu fiz'
  }
}
