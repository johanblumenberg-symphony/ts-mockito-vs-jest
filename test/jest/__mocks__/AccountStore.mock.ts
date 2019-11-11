import { AccountStore, Account } from "../../../src/AccountStore";

export class AccountStoreMock implements AccountStore {
    getAccountById = jest.fn<Account, [string]>();
}
