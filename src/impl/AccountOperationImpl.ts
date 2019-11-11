import { AccountOperation } from "../AccountOperation";
import { AccountStore, Account } from "../AccountStore";

export class AccountOperationImpl implements AccountOperation {
    constructor(private _store: AccountStore) {}

    sumAccounts(accountIds: string[]): number {
        let sum = 0;

        for (let id of accountIds ) {
            let account = this._store.getAccountById(id);
            console.log('got ' + (account && account.balance));
            sum += account.balance;
        }

        return sum;
    }
}
