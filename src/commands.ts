import * as vscode from 'vscode';
import { constructCommand, delay, getColor } from './helpers';
import { debugLaunchConfigSchema, openTerminalConfigSchema } from './helpers/validationSchemas';

async function openTerminal(terminalConfigRaw): Promise<any> {
  try {
    const terminalConfig: any = await openTerminalConfigSchema.validate(terminalConfigRaw, { strict: true });

    const { name, color, command, runtimeArgs = [], autoFocus } = terminalConfig;

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

    vscode.window.showInformationMessage('[Open Terminal] A new Terminal opened successfully 🚀');
  } catch (e) {
    console.error(`[Open Terminal] ${e.message}`);
    return vscode.window.showErrorMessage(`[Open Terminal] ${e.message}`, 'OK');
  }
}

async function debugTerminal(launchConfigRaw) {
  try {
    const launchConfig: any = await debugLaunchConfigSchema.validate(launchConfigRaw, { strict: true });

    await vscode.debug.startDebugging(undefined, launchConfig);

    await vscode.commands.executeCommand('workbench.debug.action.focusRepl');

    await vscode.window.showInformationMessage('[Open Terminal] Debug session started successfully 🚀');
  } catch (error) {
    console.error(`[Open Terminal] ${error.message}`);
    return vscode.window.showErrorMessage(`[Open Terminal] ${error.message}`, "I'm sorry");
  }
}

export const ALLOWED_COMMANDS = {
  '': openTerminal,
  debug: debugTerminal,
};
