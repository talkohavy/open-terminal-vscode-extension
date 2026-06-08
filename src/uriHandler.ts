import * as vscode from 'vscode';
import { debugTerminal } from './commands/debugTerminal';
import { jsDebugTerminal } from './commands/jsDebugTerminal';
import { openTerminal } from './commands/openTerminal';
import { Commands, CommandValues } from './common/types';

const COMMAND_MAPPER = {
  [Commands.OpenTerminal]: openTerminal,
  [Commands.DebugTerminal]: debugTerminal,
  [Commands.JsDebugTerminal]: jsDebugTerminal,
};

export default class UriHandler implements vscode.UriHandler {
  private disposables: vscode.Disposable[] = [];

  constructor() {
    this.disposables.push(vscode.window.registerUriHandler(this));
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
    this.disposables = [];
  }

  handleUri(uri: vscode.Uri): void {
    const command = uri.path.replaceAll('/', '') as CommandValues;

    if (!Object.keys(COMMAND_MAPPER).includes(command)) {
      vscode.window.showErrorMessage(
        "[Open Terminal] Allowed commands are: [ '', '/debug', '/js-debug' ]. Example: 'vscode://open.in-terminal/js-debug?config={...}'",
        'Forgive me',
      );
      return;
    }

    const terminalConfig = this.extractConfigFromUri(uri);

    COMMAND_MAPPER[command](terminalConfig);
  }

  extractConfigFromUri(uri: vscode.Uri) {
    try {
      const searchParams = new URLSearchParams(uri.query);

      const configAsString = searchParams.get('config')!;

      const isEncoded = ['true', '1'].includes(searchParams.get('encoded')!);

      const decodedConfigAsString = isEncoded ? decodeURIComponent(atob(configAsString)) : configAsString;

      const decodedConfig = JSON.parse(decodedConfigAsString);

      return decodedConfig;
    } catch (error) {
      console.log(error);
      vscode.window.showErrorMessage('[Open Terminal] Failed to extract config from URI...', "That's on me");
    }
  }
}
