import * as assert from 'assert';
import { AccountOperation } from '../../src/AccountOperation';
import { AccountOperationImpl } from '../../src/impl/AccountOperationImpl';
import { AccountStoreMock } from './__mocks__/AccountStore.mock';
import { AccountMock } from './__mocks__/Account.mock';
import { LoggerMock } from './__mocks__/Logger.mock';

describe('jest', () => {
    let accountStore: AccountStoreMock;
    let master: AccountMock;
    let account1: AccountMock;
    let account2: AccountMock;
    let account3: AccountMock;
    let logger: LoggerMock;
    let op: AccountOperation;

    beforeEach(() => {
        master = new AccountMock('master', 0);
        account1 = new AccountMock('a', 1);
        account2 = new AccountMock('b', 1);
        account3 = new AccountMock('c', 1);

        accountStore = new AccountStoreMock();
        accountStore.getAccountById.mockImplementation((id: string) => {
            if (id === 'master') return master;
            if (id === 'a') return account1;
            if (id === 'b') return account2;
            if (id === 'c') return account3;
            throw new Error('not found');
        });

        logger = new LoggerMock();

        op = new AccountOperationImpl(accountStore, logger);
    });

    it('should sum the balance of given accounts', () => {
        assert.equal(op.sumAccounts(['a', 'b', 'c']), 3);
    });

    it('should not include negative balances', () => {
        account2.balance = -1;

        assert.equal(op.sumAccounts(['a', 'b', 'c']), 2);
    });

    it('should retry getting account on network failures', () => {
        let first = true;
        accountStore.getAccountById.mockImplementation((id: string) => {
            if (id === 'master') return master;
            if (id === 'a') return account1;
            if (id === 'b' && first) { first = false; throw new Error('NetworkError'); }
            if (id === 'b' && !first) return account2;
            if (id === 'c') return account3;
            throw new Error('not found');
        });
        assert.equal(op.sumAccounts(['a', 'b', 'c']), 3);
    });

    it('should fail on other errors', () => {
        accountStore.getAccountById.mockImplementation((id: string) => {
            if (id === 'master') return master;
            if (id === 'a') return account1;
            if (id === 'b') throw new Error('OtherError');
            if (id === 'c') return account3;
            throw new Error('not found');
        });
        assert.throws(() => op.sumAccounts(['a', 'b', 'c']));
    });

    it('should log the involved accounts', () => {
        assert.equal(op.sumAccounts(['a', 'b']), 2);
        expect(logger.logAccount).toHaveBeenCalledTimes(3);
        expect(logger.logAccount).toHaveBeenCalledWith('a', 'master');
        expect(logger.logAccount).toHaveBeenCalledWith('b', 'master');
    });

    it('should not log failing accounts', () => {
        accountStore.getAccountById.mockImplementation((id: string) => {
            if (id === 'master') return master;
            if (id === 'a') return account1;
            if (id === 'b') throw new Error('OtherError');
            throw new Error('not found');
        });
        assert.throws(() => op.sumAccounts(['a', 'b']), 'failed to fetch b');
        expect(logger.logAccount).not.toHaveBeenCalledWith('b', 'master');
    });

    it('should always add the master account', () => {
        master.balance = 1;
        assert.equal(op.sumAccounts(['a', 'b', 'c']), 4);
    });
});
