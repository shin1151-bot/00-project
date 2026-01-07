import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Get('main')
    async getMainAccount() {
        return this.accountsService.getMainAccount();
    }

    @Get(':id/transactions')
    async getTransactions(@Param('id') id: string) {
        return this.accountsService.getTransactions(id);
    }
}
