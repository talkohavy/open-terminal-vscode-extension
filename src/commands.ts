import * as vscode from 'vscode';
import Script from './script';

async function execute(params) {
  if (!params) return;

  try {
    await Script.run(params);
  } catch (e) {
    return vscode.window.showErrorMessage('[Debug Launcher] An error occurred, check the terminal');
  }

  // vscode.window.showErrorMessage(`Invalid launch configuration returned from provider "${params}"`);

  // vscode.window.showErrorMessage("Couldn't generate a launch configuration");

  // vscode.debug.startDebugging(undefined, params.configuration);

  // return vscode.commands.executeCommand('workbench.debug.action.focusRepl');

  // if (launch.command) return vscode.commands.executeCommand(launch.command);
}

export { execute };
