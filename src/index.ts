import * as inquirer from "inquirer";

import { Command, flags } from "@oclif/command";

import chalk from "chalk";
import cli from "cli-ux";

export class SenutilaCommand extends Command {
  static flags = {
    database: flags.string({
      options: ["sqlite", "sql"],
    }),
  };

  async run() {
    const { flags } = this.parse(SenutilaCommand);
    let database = flags.database;
    if (!database) {
      let responses: any = await inquirer.prompt([
        {
          name: "database",
          message: "What database do you want to use?",
          type: "list",
          choices: [{ name: "SQLite" }, { name: "Other SQL database" }],
        },
      ]);
      database = responses.database;
    }
    this.log(`Using ${chalk.magenta(database)} as the database.`);
    cli.action.start("Generating project", "writing files", { stdout: true });

    setTimeout(() => cli.action.stop(), 5000);
  }
}
