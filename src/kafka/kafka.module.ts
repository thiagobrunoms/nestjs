import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaController } from './kafka.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PEDEAIVAI_CLIENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'client_test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'pedeaivai_delivery',
          },
        },
      },
    ]),
  ],
  exports: [KafkaModule],
  controllers: [KafkaController],
})
export class KafkaModule {}
