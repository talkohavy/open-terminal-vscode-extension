import * as vscode from 'vscode';
import { TerminalConfig } from '../../common/types';
import { constructCommand } from '../../common/utils/constructCommand';
import { delay } from '../../common/utils/delay';
import { getColor } from '../../common/utils/getColor';
import { openTerminalConfigSchema } from '../../common/utils/validationSchemas';

export async function openTerminal(terminalConfigRaw: TerminalConfig) {
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

    if (autoFocus) {
      term.show();
    }

    const commandString = constructCommand({ command, runtimeArgs });

    term.sendText(commandString);

    vscode.window.showInformationMessage('[Open Terminal] A new Terminal opened successfully 🚀');
  } catch (e) {
    console.error(`[Open Terminal] ${e.message}`);
    return vscode.window.showErrorMessage(`[Open Terminal] ${e.message}`, 'OK');
  }
}
