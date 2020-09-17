import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    KafkaModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
      },
    },
  );
  kafkaApp.listen(() => console.log('Kafka client is running'));
  await app.listen(3333);
}
bootstrap();
