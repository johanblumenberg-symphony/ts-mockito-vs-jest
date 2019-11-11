import { AccountOperation } from "../AccountOperation";
import { AccountStore, Account } from "../AccountStore";

export class AccountOperationImpl implements AccountOperation {
    constructor(private _store: AccountStore) {}

    private getAccountWithRetry(id: string): Account {
        while(true) {
            try {
                console.log('getAccountById(' + id + ')');
                return this._store.getAccountById(id);
            } catch (err) {
                console.log('error: ' + err.message);
                if (err.message !== 'NetworkError') {
                    throw err;
                }
            }
        }
    }

    sumAccounts(accountIds: string[]): number {
        let sum = 0;

        for (let id of accountIds ) {
            let account = this.getAccountWithRetry(id);
            console.log('got ' + (account && account.balance));
            if (account.balance > 0) {
                sum += account.balance;
            }
        }

        return sum;
    }
}
