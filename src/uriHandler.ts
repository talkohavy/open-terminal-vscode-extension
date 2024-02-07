import * as vscode from 'vscode';
import { openTerminal } from './openTerminal';

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
    const isPathExists = uri.path.replaceAll('/', '');
    if (isPathExists)
      return vscode.window.showErrorMessage('Url needs to look like: "vscode://open.in-terminal?config={...}"');

    const terminalConfig = this.extractConfigFromUri(uri);

    return openTerminal(terminalConfig) as any;
  }

  extractConfigFromUri(uri: vscode.Uri) {
    try {
      const searchParams = new URLSearchParams(uri.query);

      const configAsString = searchParams.get('config');

      const config = JSON.parse(configAsString);

      return config;
    } catch (error) {
      console.log(error);
      vscode.window.showErrorMessage('Failed to extract config from URI...');
    }
  }
}

export default UriHandler;
