import * as vscode from 'vscode';
import Script from './script';

async function execute(params) {
  if (!params) return;

  try {
    await Script.run(params);
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

export { execute };
