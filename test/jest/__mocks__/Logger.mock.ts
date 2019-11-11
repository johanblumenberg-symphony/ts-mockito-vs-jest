import { Logger } from "../../../src/Logger";

export class LoggerMock implements Logger {
    logAccount = jest.fn<void, [string]>();
}
