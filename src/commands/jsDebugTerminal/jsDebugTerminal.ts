import * as vscode from 'vscode';
import { TerminalConfig } from '../../common/types';
import { constructCommand } from '../../common/utils/constructCommand';
import { delay } from '../../common/utils/delay';
import { getColor } from '../../common/utils/getColor';
import { openTerminalConfigSchema } from '../../common/utils/validationSchemas';

export async function jsDebugTerminal(terminalConfigRaw: TerminalConfig) {
  try {
    const terminalConfig: any = await openTerminalConfigSchema.validate(terminalConfigRaw, { strict: true });

    const { name, color, command, runtimeArgs = [], autoFocus } = terminalConfig;
    const commandString = constructCommand({ command, runtimeArgs });

    // Bypass `extension.js-debug.createDebuggerTerminal`, which hardcodes terminal options
    // and gives no control over name, color, or autoFocus.
    //
    // Strategy: `setAutoAttachVariables` temporarily injects the JS debug bootloader env vars
    // into all new terminals via VS Code's environmentVariableCollection. We create the terminal
    // ourselves while those vars are active, giving us full control over its display options.
    // The vars are then cleared — already-open terminals are not affected by the clearing.
    const autoAttachMode = vscode.workspace
      .getConfiguration()
      .get<string>('debug.javascript.autoAttachFilter', 'disabled');
    const wasAutoAttachEnabled = autoAttachMode !== 'disabled';

    const result = await vscode.commands.executeCommand<{ ipcAddress: string } | undefined>(
      'extension.js-debug.setAutoAttachVariables',
    );

    if (result?.ipcAddress) {
      const term = vscode.window.createTerminal({
        name,
        color: getColor(color),
        iconPath: new vscode.ThemeIcon('debug'),
        isTransient: true,
      });

      // Only clear the auto-attach env vars if they weren't already active before this call.
      // Clearing when the user had auto-attach enabled would silently break their setup.
      if (!wasAutoAttachEnabled) {
        await vscode.commands.executeCommand('extension.js-debug.clearAutoAttachVariables');
      }

      await term.processId;
      await delay(300);

      if (autoFocus) term.show();
      term.sendText(commandString);
    } else {
      // Fallback when the auto-attach approach is unavailable.
      // Passing `name` in the config makes TerminalNodeLauncher use it as the terminal
      // display name (flows through runData.params.name → TerminalOptions.name).
      // Note: color and autoFocus:false are not supported in this fallback path.
      await vscode.commands.executeCommand(
        'extension.js-debug.createDebuggerTerminal',
        commandString,
        undefined,
        name ? { name } : undefined,
      );
    }

    vscode.window.showInformationMessage('[Open Terminal] A JavaScript Debug Terminal opened successfully 🚀');
  } catch (e: any) {
    console.error(`[Open Terminal] ${e.message}`);
    return vscode.window.showErrorMessage(`[Open Terminal] ${e.message}`, 'OK');
  }
}
