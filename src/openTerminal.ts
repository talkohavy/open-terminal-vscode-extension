import * as vscode from 'vscode';
import { delay, getColor } from './helpers';

async function openTerminal(params): Promise<any> {
  if (!params) return;

  try {
    const { name, color, command, runtimeArgs, autoFocus } = params;

    const term = vscode.window.createTerminal({
      name,
      color: getColor(color),
      isTransient: false,
      // iconPath,
    });

    await term.processId;
    await delay(300);

    autoFocus && term.show();

    term.sendText(`${command} ${runtimeArgs.join(' ')}`);

    vscode.window.showInformationMessage('A new Terminal opened 🚀');
  } catch (e) {
    console.error(e);
    return vscode.window.showErrorMessage('[Open Terminal] An error occurred, check the terminal');
  }

  // vscode.window.showErrorMessage(`Invalid command returned with "${params}"`);

  // vscode.window.showErrorMessage("Couldn't generate a terminal");

  // vscode.debug.startDebugging(undefined, params.configuration);

  // return vscode.commands.executeCommand('workbench.debug.action.focusRepl');

  // if (execute.command) return vscode.commands.executeCommand(execute.command);
}

export { openTerminal };
