import * as vscode from 'vscode';
import { delay, getColor } from './helpers';

async function openTerminal(params): Promise<any> {
  if (!params) return;

  try {
    const { name, color, command, runtimeArgs = [], autoFocus } = params;

    const term = vscode.window.createTerminal({
      name,
      color: getColor(color),
      isTransient: false,
      // iconPath,
    });

    await term.processId;
    await delay(300);

    autoFocus && term.show();

    const commandString = constructCommand({ command, runtimeArgs });

    term.sendText(commandString);

    vscode.window.showInformationMessage('A new Terminal opened 🚀');
  } catch (e) {
    console.error(e);
    return vscode.window.showErrorMessage('[Open Terminal] An error occurred, check the terminal');
  }
}

function constructCommand({ command, runtimeArgs }) {
  const flagsAndSubCommands = runtimeArgs?.join(' ') || '';

  const commandString = `${command} ${flagsAndSubCommands}`;

  return commandString;
}

export { openTerminal };
