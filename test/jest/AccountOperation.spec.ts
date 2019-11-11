import * as assert from 'assert';
import { AccountOperation } from '../../src/AccountOperation';
import { AccountOperationImpl } from '../../src/impl/AccountOperationImpl';
import { AccountStoreMock } from './__mocks__/AccountStore.mock';
import { AccountMock } from './__mocks__/Account.mock';

describe('jest', () => {
    let accountStore: AccountStoreMock;
    let account1: AccountMock;
    let account2: AccountMock;
    let account3: AccountMock;
    let op: AccountOperation;

    beforeEach(() => {
        account1 = new AccountMock('a', 1);
        account2 = new AccountMock('b', 1);
        account3 = new AccountMock('c', 1);

        accountStore = new AccountStoreMock();
        accountStore.getAccountById.mockImplementation((id: string) => {
            if (id === 'a') return account1;
            if (id === 'b') return account2;
            if (id === 'c') return account3;
            throw new Error('not found');
        });

        op = new AccountOperationImpl(accountStore);
    });

    it('should sum the balance of given accounts', () => {
        assert.equal(op.sumAccounts(['a', 'b', 'c']), 3);
    });
});
