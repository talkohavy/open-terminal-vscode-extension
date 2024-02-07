import * as vscode from 'vscode';
import UriHandler from './uriHandler';

function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('in-terminal.restart', () => {
    vscode.window.showInformationMessage('Open Terminal Restarted ✅');
  });

  const disposable2 = vscode.commands.registerCommand('in-terminal.open', () => {
    vscode.window.showInformationMessage('A new Terminal opened 🚀');
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);

  new UriHandler();

  // return activateCommand(context);
}

// function activateCommand(context: vscode.ExtensionContext) {
//   const { commands } = vscode.extensions.getExtension('open.in-terminal').packageJSON.contributes;

//   commands.forEach(({ command }) => {
//     const commandName = command.split('.').pop() as string;
//     console.log(commandName);
//     const handler = () => {};
//     // const disposable = vscode.commands.registerCommand(command, handler);

//     // context.subscriptions.push(disposable);
//   });
// }

export { activate };
