import * as vscode from 'vscode';
import { ALLOWED_COMMANDS } from './commands';

class UriHandler implements vscode.UriHandler {
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
    if (!Object.keys(ALLOWED_COMMANDS).includes(command))
      return vscode.window.showErrorMessage(
        "[Open Terminal] Allowed commands are: [ '', '/debug' ]. Example: 'vscode://open.in-terminal/debug?config={...}'",
        'Forgive me',
      );

    const terminalConfig = this.extractConfigFromUri(uri);

    return ALLOWED_COMMANDS[command](terminalConfig);
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

export default UriHandler;
