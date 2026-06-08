import * as vscode from 'vscode';
import { openTerminal } from './commands/openTerminal';
import { debugTerminal } from './commands/debugTerminal';
import { jsDebugTerminal } from './commands/jsDebugTerminal';
import { Commands } from './common/types';

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

  handleUri(uri: vscode.Uri) {
    const command = uri.path.replaceAll('/', '');

    if (!Object.keys(COMMAND_MAPPER).includes(command))
      return vscode.window.showErrorMessage(
        "[Open Terminal] Allowed commands are: [ '', '/debug', '/js-debug' ]. Example: 'vscode://open.in-terminal/js-debug?config={...}'",
        'Forgive me',
      );

    const terminalConfig = this.extractConfigFromUri(uri);

    return COMMAND_MAPPER[command](terminalConfig);
  }

  extractConfigFromUri(uri: vscode.Uri) {
    try {
      const searchParams = new URLSearchParams(uri.query);

      const configAsString = searchParams.get('config');

      const isEncoded = ['true', '1'].includes(searchParams.get('encoded'));

      const decodedConfigAsString = isEncoded ? decodeURIComponent(atob(configAsString)) : configAsString;

      const decodedConfig = JSON.parse(decodedConfigAsString);

      return decodedConfig;
    } catch (error) {
      console.log(error);
      vscode.window.showErrorMessage('[Open Terminal] Failed to extract config from URI...', "That's on me");
    }
  }
}
