import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  @Get()
  RetornaStatus(): string {
    return "Servidor ta de pé"
  }
}
