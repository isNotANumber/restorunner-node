import { Logger as PinoInstance, pino, transport } from "pino";
import { Logger } from "./logger.interface.js";
import { resolve } from "node:path";
import { getCurrentModuleDirectoryPath } from "../../helpers/index.js";

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = "logs/rest.log";
    const destination = resolve(modulePath, "../../../", logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: "pino/file",
          options: { destination },
        },
        {
          target: "pino/file",
          options: {},
        },
      ],
    });

    this.logger = pino({}, multiTransport);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}