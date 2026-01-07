import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // 1. 기존 데이터 삭제 (Clean up)
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // 2. 사용자 생성 (User)
    const user = await prisma.user.create({
        data: {
            email: 'toss@example.com',
            name: '김토스',
            passwordHash: 'dummy_hash', // 실제로는 해싱된 비밀번호여야 함
            pinCode: '326623',
        },
    });

    console.log(`👤 Created user: ${user.name} (${user.email})`);

    // 3. 계좌 생성 (Account)
    const account = await prisma.account.create({
        data: {
            userId: user.id,
            accountNumber: '1000-12-345678',
            bankName: '토스뱅크',
            balance: 1543000,
            type: 'CHECKING',
        },
    });

    console.log(`🏦 Created account: ${account.bankName} ${account.accountNumber}`);

    // 4. 거래내역 생성 (Transactions)
    const transactions = [
        {
            type: 'DEPOSIT',
            amount: 2500000,
            balanceAfter: 2500000,
            description: '급여 입금',
            transactedAt: new Date('2024-03-01T09:00:00Z'),
        },
        {
            type: 'WITHDRAW',
            amount: 4500,
            balanceAfter: 2495500,
            description: '스타벅스 강남점',
            transactedAt: new Date('2024-03-02T12:30:00Z'),
        },
        {
            type: 'WITHDRAW',
            amount: 12000,
            balanceAfter: 2483500,
            description: '배달의민족',
            transactedAt: new Date('2024-03-02T19:00:00Z'),
        },
        {
            type: 'WITHDRAW',
            amount: 50000,
            balanceAfter: 2433500,
            description: '친구 송금',
            transactedAt: new Date('2024-03-03T10:00:00Z'),
        },
        {
            type: 'DEPOSIT',
            amount: 100000,
            balanceAfter: 2533500,
            description: '용돈',
            transactedAt: new Date('2024-03-03T15:00:00Z'),
        },
    ];

    for (const t of transactions) {
        await prisma.transaction.create({
            data: {
                accountId: account.id,
                type: t.type,
                amount: t.amount,
                balanceAfter: t.balanceAfter,
                description: t.description,
                transactedAt: t.transactedAt,
            },
        });
    }

    console.log(`💸 Created ${transactions.length} transactions`);
    console.log('✅ Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
