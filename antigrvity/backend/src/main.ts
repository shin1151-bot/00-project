import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS 허용 (프론트엔드 localhost 접속 허용)
    app.enableCors();

    // 입력값 검증 파이프 적용 (class-validator)
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // DTO에 없는 속성은 제거
        forbidNonWhitelisted: true, // 이상한 속성이 오면 에러
        transform: true, // 타입 자동 변환
    }));

    await app.listen(3000);
    console.log(`🚀 Backend Server running on http://localhost:3000`);
}
bootstrap();
