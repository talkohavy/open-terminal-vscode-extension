import * as vscode from 'vscode';
import * as Commands from './commands';

const Utils = {
  activateCommand(context: vscode.ExtensionContext) {
    const { commands } = vscode.extensions.getExtension('open.in-terminal').packageJSON.contributes;

    commands.forEach(({ command }) => {
      const commandName = command.split('.').pop() as string,
        handler = Commands[commandName],
        disposable = vscode.commands.registerCommand(command, () => handler());

      context.subscriptions.push(disposable);
    });

    return Commands;
  },

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Utils;
