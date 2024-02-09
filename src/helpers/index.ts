import * as vscode from 'vscode';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getColor(colorName: string) {
  if (!colorName) return;

  const capitalizedColorName = colorName[0].toLocaleUpperCase() + colorName.substring(1);

  return new vscode.ThemeColor(`terminal.ansi${capitalizedColorName}`);
}

function constructCommand({ command, runtimeArgs }) {
  const flagsAndSubCommands = runtimeArgs?.join(' ') || '';

  const commandString = `${command} ${flagsAndSubCommands}`;

  return commandString;
}

export { constructCommand, delay, getColor };
