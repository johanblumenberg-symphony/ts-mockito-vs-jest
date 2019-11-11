export interface Logger {
    logAccount(master: string, id: string);

    logUser(id: string): void;
    logChair(): void;
    logHouse(): void;
    logExtra(): void;
    logOver(): void;
    logUnder(): void;
}
