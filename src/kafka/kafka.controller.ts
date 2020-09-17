import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller('kafka')
export class KafkaController implements OnModuleInit {
  constructor(
    @Inject('PEDEAIVAI_CLIENT_SERVICE')
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.clientKafka.connect();
  }

  @MessagePattern('new_client')
  sendMessage(): void {
    console.log('emiting...');

    this.clientKafka.emit('new_client', {
      key: '123',
      value: { data: { age: 34, name: 'thiago' } },
    });
    return;
  }

  @Get('')
  teste(): void {
    this.sendMessage();
  }
}
