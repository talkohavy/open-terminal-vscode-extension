import * as vscode from 'vscode';
import { constructCommand, delay, getColor } from './helpers';
import { debugLaunchConfigSchema } from './helpers/validationSchemas';

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

    vscode.window.showInformationMessage('[Open Terminal] ✅ A new Terminal opened successfully 🚀');
  } catch (e) {
    console.error(e);
    return vscode.window.showErrorMessage('[Open Terminal] ❌ An error occurred, check the terminal');
  }
}

async function debugTerminal(launchConfig) {
  try {
    const parsedLaunchConfig: any = await debugLaunchConfigSchema.validate(launchConfig, { strict: true });

    await vscode.debug.startDebugging(undefined, parsedLaunchConfig);

    await vscode.commands.executeCommand('workbench.debug.action.focusRepl');

    await vscode.window.showInformationMessage('[Open Terminal] ✅ Debug session started successfully 🚀');
  } catch (error) {
    console.error(error);
    return vscode.window.showErrorMessage('[Open Terminal] ❌', error.message);
  }
}

export const ALLOWED_COMMANDS = {
  '': openTerminal,
  debug: debugTerminal,
};
