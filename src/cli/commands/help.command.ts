import { Command } from "./command.interface.js";

export class HelpCommand implements Command {
  public getName(): string {
    return "--help";
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    A program for preparing data for a REST API server.
    Example:
        cli.js --<command> [--arguments]
    Commands:
        --version:                  # prints version number
        --help:                     # prints this text
        --import <path>:            # imports data from TSV
        --generate <n> <path> <url> # generates an arbitrary amount of test data`);
  }
}
