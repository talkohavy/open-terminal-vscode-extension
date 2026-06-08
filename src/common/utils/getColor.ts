import * as vscode from 'vscode';

export function getColor(colorName: string) {
  if (!colorName) return;

  const capitalizedColorName = colorName[0]!.toLocaleUpperCase() + colorName.substring(1);

  return new vscode.ThemeColor(`terminal.ansi${capitalizedColorName}`);
}
