import * as vscode from 'vscode';
import Utils from './utils';

const Script = {
  async run(params) {
    let { name, command, runtimeArgs } = params;

    const term = vscode.window.createTerminal({ name, shellArgs: ['--test'] });

    await term.processId;
    await Utils.delay(300);

    term.show(true);

    term.sendText(
      `(${command} ${runtimeArgs.join(' ')} ) && echo 'Command executed successfully' || echo 'An error occurred'`,
    );
  },
};

export default Script;
