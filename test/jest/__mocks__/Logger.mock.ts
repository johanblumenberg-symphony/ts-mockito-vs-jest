import { Logger } from "../../../src/Logger";

export class LoggerMock implements Logger {
    logAccount = jest.fn<void, [string]>();

    logUser = jest.fn<void, [string]>();
    logChair = jest.fn<void, []>();
    logHouse = jest.fn<void, []>();
    logExtra = jest.fn<void, []>();
    logOver = jest.fn<void, []>();
    logUnder = jest.fn<void, []>();
}
