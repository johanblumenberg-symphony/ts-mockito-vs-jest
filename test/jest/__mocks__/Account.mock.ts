import { Account } from '../../../src/AccountStore';

export class AccountMock implements Account {
    constructor(public id: string, public balance: number) {}
}
