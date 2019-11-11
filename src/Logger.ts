export interface Logger {
    logAccount(id: string);

    logUser(id: string): void;
    logChair(): void;
    logHouse(): void;
    logExtra(): void;
    logOver(): void;
    logUnder(): void;
}
