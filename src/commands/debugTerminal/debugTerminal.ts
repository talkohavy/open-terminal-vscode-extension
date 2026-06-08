import * as vscode from 'vscode';
import { debugLaunchConfigSchema } from '../../common/utils/validationSchemas';
import { LaunchConfig } from '../../common/types';

export async function debugTerminal(launchConfigRaw: LaunchConfig) {
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
