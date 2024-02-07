import * as querystring from 'querystring';
import * as vscode from 'vscode';
import * as Commands from './commands';

class DebugLauncherUriHandler implements vscode.UriHandler {
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
    if (!command) return vscode.window.showErrorMessage('You need to provide a command');

    if (!Commands[command]) return vscode.window.showErrorMessage(`No command named "${command}" found`);

    const paramsAsString = querystring.parse(uri.query).params as string;

    const params = JSON.parse(paramsAsString);

    return Commands[command](params);
  }
}

export default DebugLauncherUriHandler;
