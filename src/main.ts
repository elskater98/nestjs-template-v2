import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'debug', 'log', 'verbose']});

    app.useGlobalPipes(new ValidationPipe())

    const config = app.get(ConfigService)

    await app.listen(config.get<string>('SERVER_PORT', '3000'));
}

bootstrap();
