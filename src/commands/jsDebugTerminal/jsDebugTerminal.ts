import * as vscode from 'vscode';
import { constructCommand } from '../../common/utils/constructCommand';
import { openTerminalConfigSchema } from '../../common/utils/validationSchemas';
import { TerminalConfig } from '../../common/types';

export async function jsDebugTerminal(terminalConfigRaw: TerminalConfig) {
  try {
    const terminalConfig: any = await openTerminalConfigSchema.validate(terminalConfigRaw, { strict: true });

    const { command, runtimeArgs = [] } = terminalConfig;

    const commandString = constructCommand({ command, runtimeArgs });

    // Opens a JavaScript Debug Terminal — any Node.js process started inside it is
    // automatically attached to the debugger without a launch configuration.
    await vscode.commands.executeCommand('extension.js-debug.createDebuggerTerminal', commandString);

    vscode.window.showInformationMessage('[Open Terminal] A JavaScript Debug Terminal opened successfully 🚀');
  } catch (e) {
    console.error(`[Open Terminal] ${e.message}`);
    return vscode.window.showErrorMessage(`[Open Terminal] ${e.message}`, 'OK');
  }
}
