import * as assert from 'assert';
import { AccountOperation } from '../../src/AccountOperation';
import { AccountOperationImpl } from '../../src/impl/AccountOperationImpl';
import { AccountStore, Account } from '../../src/AccountStore';
import { imock, instance, when } from 'ts-mockito';

describe('ts-mockito', () => {
    let accountStore: AccountStore;
    let account1: Account;
    let account2: Account;
    let account3: Account;
    let op: AccountOperation;

    beforeEach(() => {
        account1 = imock();
        when(account1.id).thenReturn('a');
        when(account1.balance).thenReturn(1);
        account2 = imock();
        when(account2.id).thenReturn('b');
        when(account2.balance).thenReturn(1);
        account3 = imock();
        when(account3.id).thenReturn('c');
        when(account3.balance).thenReturn(1);

        accountStore = imock();
        when(accountStore.getAccountById('a')).thenReturn(instance(account1));
        when(accountStore.getAccountById('b')).thenReturn(instance(account2));
        when(accountStore.getAccountById('c')).thenReturn(instance(account3));

        op = new AccountOperationImpl(instance(accountStore));
    });

    it('should sum the balance of given accounts', () => {
        assert.equal(op.sumAccounts(['a', 'b', 'c']), 3);
    });

    it('should not include negative balances', () => {
        when(account2.balance).thenReturn(-1);

        assert.equal(op.sumAccounts(['a', 'b', 'c']), 2);
    });

    it('should retry getting account on network failures', () => {
        when(accountStore.getAccountById('b')).thenThrow(new Error('NetworkError')).thenReturn(instance(account1));
        assert.equal(op.sumAccounts(['a', 'b', 'c']), 3);
    });

    it('should fail on other errors', () => {
        when(accountStore.getAccountById('b')).thenThrow(new Error('OtherError'));
        assert.throws(() => op.sumAccounts(['a', 'b', 'c']), 'failed to fetch b');
    });
});
