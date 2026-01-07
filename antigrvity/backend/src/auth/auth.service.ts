import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { VerifyPinDto } from './dto/verify-pin.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async verifyPin(dto: VerifyPinDto) {
        // 데모용: DB의 첫 번째 유저를 가져옴
        const user = await this.prisma.user.findFirst();

        if (!user) {
            throw new UnauthorizedException('사용자가 존재하지 않습니다.');
        }

        if (user.pinCode !== dto.pinCode) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }

        // 로그인 성공 시 유저 정보 반환
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
