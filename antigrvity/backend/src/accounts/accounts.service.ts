import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) { }

    // 1. 메인 계좌 조회 (편의상 첫 번째 사용자, 첫 번째 계좌)
    async getMainAccount() {
        // 실제로는 로그인 세션에서 User ID를 받아와야 하지만, Mock 단계이므로 첫 번째 유저 사용
        const user = await this.prisma.user.findFirst({
            include: { accounts: true }
        });

        if (!user || user.accounts.length === 0) {
            throw new NotFoundException('계좌를 찾을 수 없습니다.');
        }

        return user.accounts[0];
    }

    // 2. 거래 내역 조회
    async getTransactions(accountId: string) {
        return this.prisma.transaction.findMany({
            where: { accountId },
            orderBy: { transactedAt: 'desc' }, // 최신순 정렬
        });
    }
}
