import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { winstonConfig } from "./common/logging/winston.logging";
import { WinstonModule } from "nest-winston";
import { AllExeptionsFilter } from "./common/errors/error.handling";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const PORT = process.env.PORT || 3030;
  app.use(cookieParser());
  app.setGlobalPrefix("api");

  

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.useGlobalFilters(new AllExeptionsFilter());
  const config = new DocumentBuilder()
    .setTitle("Onelin Course Project")
    .setDescription("Onelin Course REST API")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
      "access-token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT);
  console.log(`\n \nServer running on http://localhost:${PORT}`);
}
bootstrap();
